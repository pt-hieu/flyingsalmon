import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisItem,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

function TripTrail({ label }: { label?: string }) {
  return (
    <Breadcrumb aria-label={label}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/trips">Trips</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/trips/japan">Japan</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Kyoto</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function CollapsedTripTrail({ triggerLabel }: { triggerLabel?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/trips">Trips</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis label={triggerLabel}>
            <BreadcrumbEllipsisItem asChild>
              <a href="/trips/japan">Japan</a>
            </BreadcrumbEllipsisItem>
            <BreadcrumbEllipsisItem asChild>
              <a href="/trips/japan/kyoto">Kyoto</a>
            </BreadcrumbEllipsisItem>
            <BreadcrumbEllipsisItem asChild>
              <a href="/trips/japan/kyoto/day-3">Day 3</a>
            </BreadcrumbEllipsisItem>
          </BreadcrumbEllipsis>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/trips/japan/kyoto/day-3/temples">
            Temples
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Kinkaku-ji</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
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

  it('renders the consumer own anchor under asChild', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/trips?sort=recent" data-testid="router-link">
                Trips
              </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )

    const link = screen.getByRole('link', { name: 'Trips' })

    expect(link).toHaveAttribute('href', '/trips?sort=recent')
    expect(link).toHaveAttribute('data-testid', 'router-link')
    expect(link.querySelector('a')).toBeNull()
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
