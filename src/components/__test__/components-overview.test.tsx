import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { ComponentsOverview } from '@/components/components-overview'
import { componentCatalog } from '@/components/component-catalog'
import { renderWithRouter } from '@/test/render-with-router'

function StatefulOverview({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)

  return <ComponentsOverview query={query} onQueryChange={setQuery} />
}

function outsideInertPreviews(elements: HTMLElement[]) {
  return elements.filter((element) => !element.closest('[inert]'))
}

function categoryHeadings() {
  return outsideInertPreviews(
    screen.queryAllByRole('heading', { level: 2 }),
  ).map((heading) => heading.textContent)
}

function componentLinks() {
  return outsideInertPreviews(screen.queryAllByRole('link'))
}

describe('ComponentsOverview', () => {
  it('shows every category with a card linking to each component page', async () => {
    await renderWithRouter(<StatefulOverview />)

    expect(categoryHeadings()).toEqual([
      'Inputs',
      'Data display',
      'Feedback',
      'Surfaces & overlays',
      'Navigation',
    ])
    expect(screen.getByRole('link', { name: 'Dialog' })).toHaveAttribute(
      'href',
      '/components/dialog',
    )
    expect(componentLinks()).toHaveLength(componentCatalog.length)
  })

  it('narrows the grid to the matching components and hides empty categories', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<StatefulOverview />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Filter components' }),
      'toast',
    )

    expect(categoryHeadings()).toEqual(['Feedback'])
    expect(componentLinks().map((link) => link.textContent)).toEqual(['Notice'])
  })

  it('offers to clear the search when nothing matches', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<StatefulOverview initialQuery="zzz" />)

    expect(componentLinks()).toHaveLength(0)
    expect(
      screen.getByRole('region', { name: 'No components match “zzz”' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(componentLinks()).toHaveLength(componentCatalog.length)
    expect(
      screen.getByRole('searchbox', { name: 'Filter components' }),
    ).toHaveValue('')
  })
})
