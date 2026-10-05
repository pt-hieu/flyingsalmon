import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ComponentSearch } from '@/components/component-search'
import { componentCatalog } from '@/components/component-catalog'
import { renderWithRouter } from '@/test/render-with-router'

function searchField() {
  return screen.getByRole('combobox', { name: 'Search components' })
}

function highlightedOption() {
  const activeDescendantId = searchField().getAttribute('aria-activedescendant')
  return activeDescendantId
    ? document.getElementById(activeDescendantId)?.textContent
    : undefined
}

async function openFromTrigger() {
  const user = userEvent.setup()
  const router = await renderWithRouter(<ComponentSearch />)
  await user.click(screen.getByRole('button', { name: /Search components/ }))
  return { user, router }
}

describe('ComponentSearch', () => {
  it('opens from the trigger with focus in the field and every component listed by category', async () => {
    await openFromTrigger()

    expect(searchField()).toHaveFocus()
    const listbox = screen.getByRole('listbox')
    expect(
      within(listbox)
        .getAllByRole('group')
        .map((group) => group.getAttribute('aria-label')),
    ).toEqual([
      'Inputs',
      'Data display',
      'Feedback',
      'Surfaces & overlays',
      'Navigation',
    ])
    expect(within(listbox).getAllByRole('option')).toHaveLength(
      componentCatalog.length,
    )
  })

  it('moves the highlight with the arrow keys, wrapping at both ends', async () => {
    const { user } = await openFromTrigger()

    await user.type(searchField(), 'avatar')
    expect(highlightedOption()).toContain('Avatar')

    await user.keyboard('{ArrowDown}')
    expect(highlightedOption()).toContain('Avatar group')

    await user.keyboard('{ArrowDown}')
    expect(highlightedOption()).not.toContain('Group')

    await user.keyboard('{ArrowUp}')
    expect(highlightedOption()).toContain('Avatar group')
  })

  it('navigates to the highlighted component on Enter and closes', async () => {
    const { user, router } = await openFromTrigger()

    await user.type(searchField(), 'modal{Enter}')

    await waitFor(() =>
      expect(router.state.location.pathname).toBe('/components/dialog'),
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('navigates to a clicked component', async () => {
    const { user, router } = await openFromTrigger()

    await user.click(screen.getByRole('option', { name: /Toggle group/ }))

    await waitFor(() =>
      expect(router.state.location.pathname).toBe('/components/toggle-group'),
    )
  })

  it('says so when nothing matches', async () => {
    const { user } = await openFromTrigger()

    await user.type(searchField(), 'zzz')

    expect(screen.queryByRole('option')).not.toBeInTheDocument()
    expect(screen.getByText('No components match “zzz”')).toBeVisible()
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const { user } = await openFromTrigger()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Search components/ }),
    ).toHaveFocus()
  })

  it('opens with the keyboard shortcut and starts from an empty query', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<ComponentSearch />)

    await user.keyboard('{Control>}k{/Control}')
    await user.type(searchField(), 'badge')
    await user.keyboard('{Escape}')

    await user.keyboard('/')
    expect(searchField()).toHaveValue('')
  })
})
