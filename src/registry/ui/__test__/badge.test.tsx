import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Badge, BadgeVariant } from '@/registry/ui/badge'

const everyVariant: BadgeVariant[] = [
  BadgeVariant.Default,
  BadgeVariant.Secondary,
  BadgeVariant.Outline,
  BadgeVariant.Success,
  BadgeVariant.Warning,
  BadgeVariant.Error,
]

describe('Badge', () => {
  it('reads its label inline as text', () => {
    render(<Badge>Beta</Badge>)

    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('costs no tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Badge>Beta</Badge>
        <button type="button">After the badge</button>
      </>,
    )

    await user.tab()

    expect(
      screen.getByRole('button', { name: 'After the badge' }),
    ).toHaveFocus()
  })

  it('stays out of the tab order between two focusable neighbours', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before the badge</button>
        <Badge>Beta</Badge>
        <button type="button">After the badge</button>
      </>,
    )

    await user.tab()
    await user.tab()

    expect(
      screen.getByRole('button', { name: 'After the badge' }),
    ).toHaveFocus()
  })

  it('renders the icon it is given ahead of the label', () => {
    render(
      <Badge data-testid="status-badge" icon={<svg data-testid="badge-icon" />}>
        Shipped
      </Badge>,
    )

    const badge = screen.getByTestId('status-badge')
    const iconSlot = badge.firstElementChild

    expect(iconSlot).toContainElement(screen.getByTestId('badge-icon'))
    expect(badge).toHaveTextContent('Shipped')
  })

  it('hides the icon from screen readers so only the label is read', () => {
    render(<Badge icon={<svg data-testid="badge-icon" />}>Shipped</Badge>)

    expect(
      screen.getByTestId('badge-icon').closest('[aria-hidden]'),
    ).not.toBeNull()
  })

  it('renders no icon element when none is given', () => {
    render(<Badge data-testid="status-badge">Shipped</Badge>)

    expect(screen.queryByTestId('badge-icon')).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeNull()
    expect(screen.getByTestId('status-badge').firstElementChild).toBeNull()
  })

  it('keeps the label readable in every variant', () => {
    for (const variant of everyVariant) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>)

      expect(screen.getByText(variant)).toBeInTheDocument()

      unmount()
    }
  })

  it('passes span attributes through to the rendered element', () => {
    render(
      <Badge data-testid="status-badge" title="Deployed to production">
        Live
      </Badge>,
    )

    expect(screen.getByTestId('status-badge')).toHaveAttribute(
      'title',
      'Deployed to production',
    )
  })
})
