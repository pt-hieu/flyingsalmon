import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Textarea } from '@/registry/ui/textarea'

describe('Textarea', () => {
  it('focuses the field when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Notes" />)

    await user.click(screen.getByText('Notes'))

    expect(screen.getByLabelText('Notes')).toHaveFocus()
  })

  it('wires two fields on the same page to their own labels', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Textarea label="Summary" />
        <Textarea label="Details" />
      </>,
    )

    await user.click(screen.getByText('Details'))

    expect(screen.getByLabelText('Details')).toHaveFocus()
    expect(screen.getByLabelText('Summary')).not.toHaveFocus()
  })

  it('honours a caller-supplied id for the label wiring', async () => {
    const user = userEvent.setup()
    render(<Textarea id="trip-notes" label="Notes" />)

    await user.click(screen.getByText('Notes'))

    expect(screen.getByLabelText('Notes')).toHaveAttribute('id', 'trip-notes')
    expect(screen.getByLabelText('Notes')).toHaveFocus()
  })

  it('marks the field invalid and describes it with the error message', () => {
    render(<Textarea label="Notes" error="Write at least ten characters" />)

    const field = screen.getByLabelText('Notes')

    expect(field).toBeInvalid()
    expect(field).toHaveAccessibleDescription('Write at least ten characters')
  })

  it('leaves the field valid and undescribed when there is no error', () => {
    render(<Textarea label="Notes" />)

    const field = screen.getByLabelText('Notes')

    expect(field).toBeValid()
    expect(field).toHaveAccessibleDescription('')
  })

  it('exposes a required field as required', () => {
    render(<Textarea label="Notes" required />)

    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeRequired()
  })

  it('keeps the required marker out of the accessible name', () => {
    render(<Textarea label="Notes" required />)

    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument()
    expect(screen.getByText('Notes')).toHaveTextContent(/^Notes$/)
  })

  it('keeps a caller description alongside the error message', () => {
    render(
      <>
        <span id="notes-hint">Markdown is supported</span>
        <Textarea
          label="Notes"
          aria-describedby="notes-hint"
          error="Write at least ten characters"
        />
      </>,
    )

    expect(screen.getByLabelText('Notes')).toHaveAccessibleDescription(
      'Markdown is supported Write at least ten characters',
    )
  })

  it('removes the error message once the error clears', async () => {
    const { rerender } = render(
      <Textarea label="Notes" error="Write at least ten characters" />,
    )

    rerender(<Textarea label="Notes" />)

    await waitFor(() => {
      expect(
        screen.queryByText('Write at least ten characters'),
      ).not.toBeInTheDocument()
    })
    expect(screen.getByLabelText('Notes')).toBeValid()
  })

  it('stays editable while loading', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Notes" loading />)

    const field = screen.getByLabelText('Notes')

    expect(field).toHaveAttribute('aria-busy', 'true')
    expect(field).toBeEnabled()

    await user.type(field, 'a trip to Da Nang')

    expect(field).toHaveValue('a trip to Da Nang')
  })

  it('is not busy when it is not loading', () => {
    render(<Textarea label="Notes" />)

    expect(screen.getByLabelText('Notes')).not.toHaveAttribute('aria-busy')
  })

  it('shows the spinner only while loading', () => {
    const { rerender } = render(<Textarea label="Notes" />)

    expect(
      screen.queryByRole('status', { hidden: true }),
    ).not.toBeInTheDocument()

    rerender(<Textarea label="Notes" loading />)

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
  })

  it('shows the error message while still loading', () => {
    render(<Textarea label="Notes" loading error="That draft failed to save" />)

    const field = screen.getByLabelText('Notes')

    expect(screen.getByText('That draft failed to save')).toBeInTheDocument()
    expect(field).toBeInvalid()
    expect(field).toHaveAttribute('aria-busy', 'true')
  })

  it('inserts a newline when Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Notes" />)

    const field = screen.getByLabelText('Notes')

    await user.click(field)
    await user.keyboard('first{Enter}second')

    expect(field).toHaveValue('first\nsecond')
  })

  it('moves focus on Tab and never inserts a tab character', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Textarea label="Notes" />
        <button type="button">After</button>
      </>,
    )

    const field = screen.getByLabelText('Notes')

    await user.click(field)
    await user.keyboard('draft')
    await user.tab()

    expect(field).toHaveValue('draft')
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('bounds its height between three and eight rows by default', () => {
    render(<Textarea label="Notes" />)

    const field = screen.getByLabelText('Notes') as HTMLTextAreaElement

    expect(field).toHaveAttribute('rows', '3')
    expect(field.style.minHeight).toBe('calc(3lh + 2px + 1rem)')
    expect(field.style.maxHeight).toBe('calc(8lh + 2px + 1rem)')
  })

  it('bounds its height between the row counts it is given', () => {
    render(<Textarea label="Notes" minRows={2} maxRows={20} />)

    const field = screen.getByLabelText('Notes') as HTMLTextAreaElement

    expect(field).toHaveAttribute('rows', '2')
    expect(field.style.minHeight).toBe('calc(2lh + 2px + 1rem)')
    expect(field.style.maxHeight).toBe('calc(20lh + 2px + 1rem)')
  })

  it('keeps the row count on minRows when a native rows prop is passed', () => {
    const nativeRowsEscapeHatch = { rows: 12 } as Record<string, unknown>

    render(<Textarea label="Notes" minRows={4} {...nativeRowsEscapeHatch} />)

    const field = screen.getByLabelText('Notes') as HTMLTextAreaElement

    expect(field).toHaveAttribute('rows', '4')
    expect(field.style.minHeight).toBe('calc(4lh + 2px + 1rem)')
  })

  it('lets a caller style override the row bounds', () => {
    render(<Textarea label="Notes" style={{ maxHeight: '400px' }} />)

    const field = screen.getByLabelText('Notes') as HTMLTextAreaElement

    expect(field.style.maxHeight).toBe('400px')
    expect(field.style.minHeight).toBe('calc(3lh + 2px + 1rem)')
  })

  it('passes native props through to the underlying textarea', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Notes" placeholder="Tell us more" maxLength={5} />)

    const field = screen.getByLabelText('Notes')

    expect(field).toHaveAttribute('placeholder', 'Tell us more')

    await user.type(field, 'abcdefgh')

    expect(field).toHaveValue('abcde')
  })

  it('does not accept typing when disabled', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Notes" disabled />)

    const field = screen.getByLabelText('Notes')

    expect(field).toBeDisabled()

    await user.type(field, 'brian')

    expect(field).toHaveValue('')
  })
})
