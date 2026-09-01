import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Alert, AlertDescription, AlertTitle } from '@/registry/ui/alert'

describe('Alert', () => {
  it('announces info, success, and warning politely', () => {
    render(
      <>
        <Alert>Saved as a draft</Alert>
        <Alert variant="success">Saved</Alert>
        <Alert variant="warning">Two seats left</Alert>
      </>,
    )

    const politeAlerts = screen.getAllByRole('status')

    expect(politeAlerts).toHaveLength(3)
    expect(politeAlerts[0]).toHaveTextContent('Saved as a draft')
    expect(politeAlerts[1]).toHaveTextContent('Saved')
    expect(politeAlerts[2]).toHaveTextContent('Two seats left')
  })

  it('announces an error assertively', () => {
    render(<Alert variant="error">The payment failed</Alert>)

    expect(screen.getByRole('alert')).toHaveTextContent('The payment failed')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('lets a caller role override the variant mapping', () => {
    render(
      <Alert variant="error" role="status">
        The payment failed
      </Alert>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('The payment failed')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders the title and the description together', () => {
    render(
      <Alert variant="success">
        <AlertTitle>Trip saved</AlertTitle>
        <AlertDescription>Six days in Da Nang, ready to share</AlertDescription>
      </Alert>,
    )

    const alert = screen.getByRole('status')

    expect(alert).toHaveTextContent('Trip saved')
    expect(alert).toHaveTextContent('Six days in Da Nang, ready to share')
  })

  it('reports a dismissal by click and stays mounted', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Alert onClose={onClose}>Saved as a draft</Alert>)

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('reports a dismissal on Enter', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Alert onClose={onClose}>Saved as a draft</Alert>)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('reports a dismissal on Space', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Alert onClose={onClose}>Saved as a draft</Alert>)

    await user.tab()
    await user.keyboard('[Space]')

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('puts the close button in the tab order', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Alert onClose={vi.fn()}>Saved as a draft</Alert>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Dismiss' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('reaches an action in the content before the close button', async () => {
    const user = userEvent.setup()
    render(
      <Alert variant="error" onClose={vi.fn()}>
        <AlertDescription>Your card was declined.</AlertDescription>
        <button type="button">Try again</button>
      </Alert>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Try again' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Dismiss' })).toHaveFocus()
  })

  it('has no tab stop without a close handler', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Alert>Saved as a draft</Alert>
        <button type="button">After</button>
      </>,
    )

    expect(
      screen.queryByRole('button', { name: 'Dismiss' }),
    ).not.toBeInTheDocument()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('renders nothing while it is closed', () => {
    render(<Alert open={false}>Saved as a draft</Alert>)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByText('Saved as a draft')).not.toBeInTheDocument()
  })

  it('removes itself once the app closes it', async () => {
    const { rerender } = render(<Alert>Saved as a draft</Alert>)

    expect(screen.getByRole('status')).toBeInTheDocument()

    rerender(<Alert open={false}>Saved as a draft</Alert>)

    await waitFor(() => {
      expect(screen.queryByText('Saved as a draft')).not.toBeInTheDocument()
    })
  })

  it('shows a caller icon instead of the variant icon', () => {
    render(
      <Alert variant="success" icon={<span>🎉</span>}>
        Saved
      </Alert>,
    )

    const alert = screen.getByRole('status')

    expect(alert).toHaveTextContent('🎉')
    expect(alert.querySelectorAll('svg')).toHaveLength(0)
  })

  it('shows no icon at all when the icon is null', () => {
    render(
      <Alert variant="success" icon={null}>
        Saved
      </Alert>,
    )

    expect(screen.getByRole('status').querySelectorAll('svg')).toHaveLength(0)
  })

  it('shows the variant icon by default', () => {
    render(<Alert variant="success">Saved</Alert>)

    expect(
      screen.getByRole('status').querySelectorAll('svg').length,
    ).toBeGreaterThan(0)
  })

  it('passes native props through to the alert surface', () => {
    render(
      <Alert id="checkout-result" data-testid="checkout-alert">
        Saved as a draft
      </Alert>,
    )

    expect(screen.getByRole('status')).toHaveAttribute('id', 'checkout-result')
  })
})
