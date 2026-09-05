import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input, InputType } from '@/registry/ui/input'

describe('Input', () => {
  it('focuses the field when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" />)

    await user.click(screen.getByText('Email'))

    expect(screen.getByLabelText('Email')).toHaveFocus()
  })

  it('wires two fields on the same page to their own labels', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Input label="First name" />
        <Input label="Last name" />
      </>,
    )

    await user.click(screen.getByText('Last name'))

    expect(screen.getByLabelText('Last name')).toHaveFocus()
    expect(screen.getByLabelText('First name')).not.toHaveFocus()
  })

  it('honours a caller-supplied id for the label wiring', async () => {
    const user = userEvent.setup()
    render(<Input id="account-email" label="Email" />)

    await user.click(screen.getByText('Email'))

    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'id',
      'account-email',
    )
    expect(screen.getByLabelText('Email')).toHaveFocus()
  })

  it('marks the field invalid and describes it with the error message', () => {
    render(<Input label="Email" error="Enter a valid email address" />)

    const field = screen.getByLabelText('Email')

    expect(field).toBeInvalid()
    expect(field).toHaveAccessibleDescription('Enter a valid email address')
  })

  it('leaves the field valid and undescribed when there is no error', () => {
    render(<Input label="Email" />)

    const field = screen.getByLabelText('Email')

    expect(field).toBeValid()
    expect(field).toHaveAccessibleDescription('')
  })

  it('keeps a caller description alongside the error message', () => {
    render(
      <>
        <span id="email-hint">We never share it</span>
        <Input
          label="Email"
          aria-describedby="email-hint"
          error="Enter a valid email address"
        />
      </>,
    )

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'We never share it Enter a valid email address',
    )
  })

  it('removes the error message once the error clears', async () => {
    const { rerender } = render(
      <Input label="Email" error="Enter a valid email address" />,
    )

    rerender(<Input label="Email" />)

    await waitFor(() => {
      expect(
        screen.queryByText('Enter a valid email address'),
      ).not.toBeInTheDocument()
    })
    expect(screen.getByLabelText('Email')).toBeValid()
  })

  it('stays editable while loading', async () => {
    const user = userEvent.setup()
    render(<Input label="Username" loading />)

    const field = screen.getByLabelText('Username')

    expect(field).toHaveAttribute('aria-busy', 'true')
    expect(field).toBeEnabled()

    await user.type(field, 'brian')

    expect(field).toHaveValue('brian')
  })

  it('is not busy when it is not loading', () => {
    render(<Input label="Username" />)

    expect(screen.getByLabelText('Username')).not.toHaveAttribute('aria-busy')
  })

  it('places an interactive adornment after the field in the tab order', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Input
          label="Search"
          endAdornment={<button type="button">Clear</button>}
        />
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByLabelText('Search')).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('replaces the adornment with the spinner while loading', () => {
    render(
      <Input
        label="Search"
        loading
        endAdornment={<button type="button">Clear</button>}
      />,
    )

    expect(
      screen.queryByRole('button', { name: 'Clear' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
  })

  it('shows the adornment and no spinner when it is not loading', () => {
    render(
      <Input
        label="Search"
        endAdornment={<button type="button">Clear</button>}
      />,
    )

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
    expect(
      screen.queryByRole('status', { hidden: true }),
    ).not.toBeInTheDocument()
  })

  it('shows the error message while still loading', () => {
    render(
      <Input label="Email" loading error="That address is already taken" />,
    )

    const field = screen.getByLabelText('Email')

    expect(
      screen.getByText('That address is already taken'),
    ).toBeInTheDocument()
    expect(field).toBeInvalid()
    expect(field).toHaveAttribute('aria-busy', 'true')
  })

  it('passes native props through to the underlying input', async () => {
    const user = userEvent.setup()
    render(
      <Input
        label="Email"
        type={InputType.Email}
        placeholder="you@example.com"
        maxLength={5}
      />,
    )

    const field = screen.getByLabelText('Email')

    expect(field).toHaveAttribute('type', 'email')
    expect(field).toHaveAttribute('placeholder', 'you@example.com')

    await user.type(field, 'abcdefgh')

    expect(field).toHaveValue('abcde')
  })

  it('does not accept typing when disabled', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" disabled />)

    const field = screen.getByLabelText('Email')

    expect(field).toBeDisabled()

    await user.type(field, 'brian')

    expect(field).toHaveValue('')
  })
})
