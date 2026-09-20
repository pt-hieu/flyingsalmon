import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisMenuItem,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

function TripTrail({ label }: { label?: string }) {
  return (
    <Breadcrumb aria-label={label}>
      <BreadcrumbItem link href="/trips">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem link href="/trips/japan">
        Japan
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kyoto</BreadcrumbItem>
    </Breadcrumb>
  )
}

function CollapsedTripTrail({ triggerLabel }: { triggerLabel?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem link href="/trips">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis aria-label={triggerLabel}>
          <BreadcrumbEllipsisMenuItem asChild>
            <a href="/trips/japan">Japan</a>
          </BreadcrumbEllipsisMenuItem>
          <BreadcrumbEllipsisMenuItem asChild>
            <a href="/trips/japan/kyoto">Kyoto</a>
          </BreadcrumbEllipsisMenuItem>
          <BreadcrumbEllipsisMenuItem asChild>
            <a href="/trips/japan/kyoto/day-3">Day 3</a>
          </BreadcrumbEllipsisMenuItem>
        </BreadcrumbEllipsis>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem link href="/trips/japan/kyoto/day-3/temples">
        Temples
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kinkaku-ji</BreadcrumbItem>
    </Breadcrumb>
  )
}

describe('Breadcrumb', () => {
  it('is a navigation landmark named Breadcrumb', () => {
    render(<TripTrail />)

    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' }),
    ).toBeInTheDocument()
  })

  it('takes the name the consumer gives it', () => {
    render(<TripTrail label="Where you are" />)

    expect(
      screen.getByRole('navigation', { name: 'Where you are' }),
    ).toBeInTheDocument()
  })

  it('renders the ancestors as links in trail order', () => {
    render(<TripTrail />)

    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(
      ['Trips', 'Japan'],
    )
  })

  it('renders the current page as plain text marked aria-current', () => {
    render(<TripTrail />)

    expect(
      screen.queryByRole('link', { name: 'Kyoto' }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Kyoto')).toHaveAttribute('aria-current', 'page')
  })

  it('keeps the separators out of the accessibility tree', () => {
    render(<TripTrail />)

    expect(
      screen.getAllByRole('listitem').map((item) => item.textContent),
    ).toEqual(['Trips', 'Japan', 'Kyoto'])
  })

  it("renders the consumer's own anchor under asChild", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem link asChild>
          <a href="/trips?sort=recent">Trips</a>
        </BreadcrumbItem>
      </Breadcrumb>,
    )

    const link = screen.getByRole('link', { name: 'Trips' })

    expect(link).toHaveAttribute('href', '/trips?sort=recent')
    expect(link.querySelector('a')).toBeNull()
  })

  it('renders an item that is neither a link nor the current page as plain content', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Trips</BreadcrumbItem>
      </Breadcrumb>,
    )

    const item = screen.getByRole('listitem')

    expect(item).toHaveTextContent('Trips')
    expect(item).not.toHaveAttribute('aria-current')
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('names the ellipsis trigger Show hidden levels', () => {
    render(<CollapsedTripTrail />)

    expect(
      screen.getByRole('button', { name: 'Show hidden levels' }),
    ).toBeInTheDocument()
  })

  it('takes the ellipsis trigger name the consumer gives it', () => {
    render(<CollapsedTripTrail triggerLabel="Mostrar niveles ocultos" />)

    expect(
      screen.getByRole('button', { name: 'Mostrar niveles ocultos' }),
    ).toBeInTheDocument()
  })

  it('opens the hidden levels on Enter, highest ancestor first', async () => {
    const user = userEvent.setup()
    render(<CollapsedTripTrail />)

    screen.getByRole('button', { name: 'Show hidden levels' }).focus()
    await user.keyboard('{Enter}')

    await screen.findByRole('menu')
    expect(
      screen.getAllByRole('menuitem').map((item) => item.textContent),
    ).toEqual(['Japan', 'Kyoto', 'Day 3'])
  })

  it('opens the hidden levels on ArrowDown', async () => {
    const user = userEvent.setup()
    render(<CollapsedTripTrail />)

    screen.getByRole('button', { name: 'Show hidden levels' }).focus()
    await user.keyboard('{ArrowDown}')

    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })

  it('returns focus to the ellipsis trigger on Escape', async () => {
    const user = userEvent.setup()
    render(<CollapsedTripTrail />)

    const trigger = screen.getByRole('button', { name: 'Show hidden levels' })
    await user.click(trigger)
    await screen.findByRole('menu')

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })

  it('tabs through the links and the ellipsis trigger and skips the current page', async () => {
    const user = userEvent.setup()
    render(<CollapsedTripTrail />)

    await user.tab()
    expect(screen.getByRole('link', { name: 'Trips' })).toHaveFocus()

    await user.tab()
    expect(
      screen.getByRole('button', { name: 'Show hidden levels' }),
    ).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('link', { name: 'Temples' })).toHaveFocus()

    await user.tab()
    expect(screen.getByText('Kinkaku-ji')).not.toHaveFocus()
    expect(document.body).toHaveFocus()
  })
})
