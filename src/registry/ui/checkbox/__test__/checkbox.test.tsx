import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from '@/registry/ui/checkbox'

function SelectAll() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(
    'indeterminate',
  )
  return (
    <Checkbox
      label="Select all"
      checked={checked}
      onCheckedChange={setChecked}
    />
  )
}

describe('Checkbox', () => {
  it('toggles when Space is pressed on the focused box', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Remember me" />)

    const box = screen.getByRole('checkbox', { name: 'Remember me' })

    await user.tab()
    expect(box).toHaveFocus()

    await user.keyboard(' ')
    expect(box).toBeChecked()

    await user.keyboard(' ')
    expect(box).not.toBeChecked()
  })

  it('toggles when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Remember me" />)

    await user.click(screen.getByText('Remember me'))

    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeChecked()
  })

  it('wires two boxes on the same page to their own labels', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Checkbox label="Email me" />
        <Checkbox label="Text me" />
      </>,
    )

    await user.click(screen.getByText('Text me'))

    expect(screen.getByRole('checkbox', { name: 'Text me' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Email me' })).not.toBeChecked()
  })

  it('honours a caller-supplied id for the label wiring', async () => {
    const user = userEvent.setup()
    render(<Checkbox id="marketing-consent" label="Email me" />)

    const box = screen.getByRole('checkbox', { name: 'Email me' })
    expect(box).toHaveAttribute('id', 'marketing-consent')

    await user.click(screen.getByText('Email me'))
    expect(box).toBeChecked()
  })

  it('announces the indeterminate state as mixed', () => {
    render(<Checkbox label="Select all" checked="indeterminate" />)

    expect(
      screen.getByRole('checkbox', { name: 'Select all' }),
    ).toHaveAttribute('aria-checked', 'mixed')
  })

  it('announces a checked box as checked and an unchecked box as unchecked', () => {
    render(
      <>
        <Checkbox label="On" checked />
        <Checkbox label="Off" checked={false} />
      </>,
    )

    expect(screen.getByRole('checkbox', { name: 'On' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.getByRole('checkbox', { name: 'Off' })).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })

  it('reports the next value to onCheckedChange', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox label="Remember me" onCheckedChange={onCheckedChange} />)

    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('moves from indeterminate to checked on the next toggle', async () => {
    const user = userEvent.setup()

    render(<SelectAll />)
    const box = screen.getByRole('checkbox', { name: 'Select all' })

    expect(box).toHaveAttribute('aria-checked', 'mixed')

    await user.click(box)

    expect(box).toHaveAttribute('aria-checked', 'true')
  })

  it('stays put when a controlled parent ignores the change', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Locked" checked={false} />)

    const box = screen.getByRole('checkbox', { name: 'Locked' })
    await user.click(box)

    expect(box).not.toBeChecked()
  })

  it('marks the box invalid and describes it with the error message', () => {
    render(
      <Checkbox label="Accept the terms" error="You must accept the terms" />,
    )

    const box = screen.getByRole('checkbox', { name: 'Accept the terms' })

    expect(box).toBeInvalid()
    expect(box).toHaveAccessibleDescription('You must accept the terms')
  })

  it('leaves the box valid and undescribed when there is no error', () => {
    render(<Checkbox label="Accept the terms" />)

    const box = screen.getByRole('checkbox', { name: 'Accept the terms' })

    expect(box).toBeValid()
    expect(box).toHaveAccessibleDescription('')
  })

  it('exposes a required box as required', () => {
    render(<Checkbox label="Accept the terms" required />)

    expect(
      screen.getByRole('checkbox', { name: 'Accept the terms' }),
    ).toBeRequired()
  })

  it('keeps the required marker out of the accessible name', () => {
    render(<Checkbox label="Accept the terms" required />)

    expect(
      screen.getByRole('checkbox', { name: 'Accept the terms' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Accept the terms')).toHaveTextContent(
      /^Accept the terms$/,
    )
  })

  it('keeps a caller description alongside the error message', () => {
    render(
      <>
        <span id="terms-hint">Version 3, updated today</span>
        <Checkbox
          label="Accept the terms"
          aria-describedby="terms-hint"
          error="You must accept the terms"
        />
      </>,
    )

    expect(
      screen.getByRole('checkbox', { name: 'Accept the terms' }),
    ).toHaveAccessibleDescription(
      'Version 3, updated today You must accept the terms',
    )
  })

  it('removes the error message once the error clears', async () => {
    const { rerender } = render(
      <Checkbox label="Accept the terms" error="You must accept the terms" />,
    )

    rerender(<Checkbox label="Accept the terms" />)

    await waitFor(() => {
      expect(
        screen.queryByText('You must accept the terms'),
      ).not.toBeInTheDocument()
    })
    expect(
      screen.getByRole('checkbox', { name: 'Accept the terms' }),
    ).toBeValid()
  })

  it('keeps the checked value while showing an error', () => {
    render(
      <Checkbox
        label="Accept the terms"
        checked
        error="Accept the updated terms"
      />,
    )

    const box = screen.getByRole('checkbox', { name: 'Accept the terms' })

    expect(box).toBeChecked()
    expect(box).toBeInvalid()
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Checkbox
        label="Remember me"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    )

    const box = screen.getByRole('checkbox', { name: 'Remember me' })
    expect(box).toBeDisabled()

    await user.click(screen.getByText('Remember me'))

    expect(box).not.toBeChecked()
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('starts from defaultChecked when it is uncontrolled', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Remember me" defaultChecked />)

    const box = screen.getByRole('checkbox', { name: 'Remember me' })
    expect(box).toBeChecked()

    await user.click(box)
    expect(box).not.toBeChecked()
  })

  it('submits its value with the surrounding form', async () => {
    const user = userEvent.setup()
    let submittedRemember: FormDataEntryValue | null = null
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      submittedRemember = new FormData(event.currentTarget).get('remember')
    }

    render(
      <form onSubmit={onSubmit}>
        <Checkbox label="Remember me" name="remember" value="yes" />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByRole('checkbox', { name: 'Remember me' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(submittedRemember).toBe('yes')
  })

  it('renders without a label when none is given', () => {
    render(<Checkbox aria-label="Select row" />)

    expect(
      screen.getByRole('checkbox', { name: 'Select row' }),
    ).toBeInTheDocument()
  })
})
