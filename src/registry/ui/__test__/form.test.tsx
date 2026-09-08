import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button, ButtonVariant } from '@/registry/ui/button'
import { Form, FormActions } from '@/registry/ui/form'

describe('Form', () => {
  it('submits when Enter is pressed in a text field', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <input aria-label="Destination" />
      </Form>,
    )

    await user.type(screen.getByLabelText('Destination'), 'Lisbon{Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('submits when a submit button in the actions row is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <input aria-label="Destination" />
        <FormActions>
          <Button type="submit">Save trip</Button>
        </FormActions>
      </Form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save trip' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('reaches onSubmit with an empty required field, which native validation would block', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <input aria-label="Destination" required />
        <FormActions>
          <Button type="submit">Save trip</Button>
        </FormActions>
      </Form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save trip' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('lets the caller hand validation back to the browser with noValidate false', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <Form noValidate={false} onSubmit={onSubmit}>
        <input aria-label="Destination" required />
        <FormActions>
          <Button type="submit">Save trip</Button>
        </FormActions>
      </Form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save trip' }))

    expect(onSubmit).not.toHaveBeenCalled()

    await user.type(screen.getByLabelText('Destination'), 'Lisbon')
    await user.click(screen.getByRole('button', { name: 'Save trip' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('renders the result the app passes', () => {
    render(
      <Form result={<p>Trip saved</p>}>
        <input aria-label="Destination" />
      </Form>,
    )

    expect(screen.getByText('Trip saved')).toBeInTheDocument()
  })

  it('places the result after the actions row in reading order', () => {
    render(
      <Form result={<p>Trip saved</p>}>
        <input aria-label="Destination" />
        <FormActions>
          <Button type="submit">Save trip</Button>
        </FormActions>
      </Form>,
    )

    const submitButton = screen.getByRole('button', { name: 'Save trip' })
    const result = screen.getByText('Trip saved')

    expect(
      submitButton.compareDocumentPosition(result) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('leaves the type of the buttons it is given alone, so Cancel does not submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <input aria-label="Destination" />
        <FormActions>
          <Button variant={ButtonVariant.Outline}>Cancel</Button>
          <Button type="submit">Save trip</Button>
        </FormActions>
      </Form>,
    )

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('spreads native form props, so an outside button can submit it by id', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <>
        <Form id="trip-form" onSubmit={onSubmit}>
          <input aria-label="Destination" />
        </Form>
        <Button type="submit" form="trip-form">
          Save trip
        </Button>
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Save trip' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
