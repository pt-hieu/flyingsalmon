import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Badge } from '@/registry/ui/badge'

function findTextNode(container: HTMLElement, text: string) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)

  while (walker.nextNode()) {
    if (walker.currentNode.textContent === text) {
      return walker.currentNode
    }
  }

  throw new Error(`No text node reads "${text}"`)
}

describe('Badge', () => {
  it('reads its label inline as text', () => {
    render(<Badge>Beta</Badge>)

    expect(screen.getByText('Beta')).toBeInTheDocument()
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

    const label = findTextNode(screen.getByTestId('status-badge'), 'Shipped')

    expect(
      screen.getByTestId('badge-icon').compareDocumentPosition(label) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('hides the icon from screen readers so only the label is read', () => {
    render(<Badge icon={<svg data-testid="badge-icon" />}>Shipped</Badge>)

    expect(
      screen.getByTestId('badge-icon').closest('[aria-hidden]'),
    ).not.toBeNull()
  })

  it('renders no hidden icon slot when no icon is given', () => {
    const { container } = render(<Badge>Shipped</Badge>)

    expect(container.querySelector('[aria-hidden]')).toBeNull()
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
