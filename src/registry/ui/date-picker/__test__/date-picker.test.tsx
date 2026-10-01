import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'

function segments() {
  return screen.getAllByRole('spinbutton')
}

function dayButton(dayLabel: string) {
  return screen.getByRole('button', {
    name: new RegExp(`${dayLabel}( selected)?$`),
  })
}

function calendarButton() {
  return screen.getByRole('button', { name: 'Calendar' })
}

function hiddenInput(name: string) {
  return document.querySelector<HTMLInputElement>(`input[name="${name}"]`)
}

async function typeInto(
  user: ReturnType<typeof userEvent.setup>,
  firstSegment: HTMLElement,
  digits: string,
) {
  await user.click(firstSegment)
  await user.keyboard(digits)
}

describe('DatePicker', () => {
  it('reports a typed complete date as an ISO string and posts it', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker label="Departure" name="departure" onChange={onChange} />,
    )

    await typeInto(user, segments()[0], '03182026')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('2026-03-18')
    expect(hiddenInput('departure')).toHaveValue('2026-03-18')
  })

  it('reports nothing until every digit of the year is typed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker label="Departure" name="departure" onChange={onChange} />,
    )

    await typeInto(user, segments()[0], '0318202')

    expect(onChange).not.toHaveBeenCalled()
    expect(hiddenInput('departure')).toHaveValue('')

    await user.keyboard('6')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('2026-03-18')
  })

  it('refuses a typed date that isDateDisabled rejects and posts nothing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker
        label="Departure"
        name="departure"
        isDateDisabled={(date) => date === '2026-03-18'}
        onChange={onChange}
      />,
    )

    await typeInto(user, segments()[0], '03182026')

    expect(onChange).not.toHaveBeenCalled()
    expect(
      await screen.findByText("That date isn't available"),
    ).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Departure' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(hiddenInput('departure')).toHaveValue('')
  })

  it('describes the field with its description', () => {
    render(<DatePicker label="Departure" description="The day you fly out" />)

    expect(
      screen.getByRole('group', { name: 'Departure' }),
    ).toHaveAccessibleDescription('The day you fly out')
  })

  it('describes the field with the error message, then the description', () => {
    render(
      <DatePicker
        label="Departure"
        description="The day you fly out"
        error="Choose a departure date"
      />,
    )

    expect(
      screen.getByRole('group', { name: 'Departure' }),
    ).toHaveAccessibleDescription('Choose a departure date The day you fly out')
  })

  it('describes the field with a refused date, then the description', async () => {
    const user = userEvent.setup()
    render(
      <DatePicker
        label="Departure"
        description="The day you fly out"
        isDateDisabled={(date) => date === '2026-03-18'}
      />,
    )

    await typeInto(user, segments()[0], '03182026')

    await waitFor(() => {
      expect(
        screen.getByRole('group', { name: 'Departure' }),
      ).toHaveAccessibleDescription(
        "That date isn't available The day you fly out",
      )
    })
  })

  it('shows the consumer unavailableMessage in place of the built-in one', async () => {
    const user = userEvent.setup()
    render(
      <DatePicker
        label="Departure"
        isDateDisabled={(date) => date === '2026-03-18'}
        unavailableMessage="We do not fly that day"
      />,
    )

    await typeInto(user, segments()[0], '03182026')

    expect(
      await screen.findByText('We do not fly that day'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText("That date isn't available"),
    ).not.toBeInTheDocument()
  })

  it('refuses a typed end date that falls before the start date', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker
        label="Trip dates"
        mode={DatePickerMode.Range}
        onChange={onChange}
      />,
    )

    await typeInto(user, segments()[0], '03182026')
    await typeInto(user, segments()[3], '03102026')

    expect(onChange).not.toHaveBeenCalled()
    expect(
      await screen.findByText('End date must be after the start date'),
    ).toBeInTheDocument()
  })

  it('commits a range once when the end date is picked, closes, and refocuses the opener', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker
        label="Trip dates"
        mode={DatePickerMode.Range}
        defaultValue={{ start: '2026-03-02', end: '2026-03-04' }}
        onChange={onChange}
      />,
    )

    await user.click(calendarButton())
    expect(await screen.findByRole('dialog')).toBeInTheDocument()

    await user.click(dayButton('March 10, 2026'))
    expect(onChange).not.toHaveBeenCalled()

    await user.click(dayButton('March 14, 2026'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      start: '2026-03-10',
      end: '2026-03-14',
    })
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(calendarButton()).toHaveFocus()
  })

  it('returns focus to the segment that opened the panel, not the calendar button', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Departure" defaultValue="2026-03-18" />)

    const monthSegment = segments()[0]
    await user.click(monthSegment)
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}')
    await user.click(
      await screen.findByRole('button', { name: /March 20, 2026/ }),
    )

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(monthSegment).toHaveFocus()
  })

  it('keeps a read-only field out of native required validation', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <DatePicker label="Departure" name="departure" required readOnly />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('posts a value the app supplies for a year before 1000', () => {
    render(<DatePicker label="Founding" name="founding" value="0850-06-01" />)

    expect(hiddenInput('founding')).toHaveValue('0850-06-01')
    expect(
      screen.queryByText("That date isn't available"),
    ).not.toBeInTheDocument()
  })

  it('leaves the committed range in place when Escape closes a half-picked range', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker
        label="Trip dates"
        mode={DatePickerMode.Range}
        startName="from"
        endName="to"
        defaultValue={{ start: '2026-03-02', end: '2026-03-04' }}
        onChange={onChange}
      />,
    )

    await user.click(calendarButton())
    await user.click(
      await screen.findByRole('button', { name: /March 10, 2026/ }),
    )
    await user.keyboard('{Escape}')

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(onChange).not.toHaveBeenCalled()
    expect(hiddenInput('from')).toHaveValue('2026-03-02')
    expect(hiddenInput('to')).toHaveValue('2026-03-04')
  })

  it('posts a range under both names and posts nothing while it is incomplete', async () => {
    const user = userEvent.setup()
    render(
      <DatePicker
        label="Trip dates"
        mode={DatePickerMode.Range}
        startName="from"
        endName="to"
      />,
    )

    await typeInto(user, segments()[0], '03102026')

    expect(hiddenInput('from')).toHaveValue('')
    expect(hiddenInput('to')).toHaveValue('')

    await typeInto(user, segments()[3], '03142026')

    expect(hiddenInput('from')).toHaveValue('2026-03-10')
    expect(hiddenInput('to')).toHaveValue('2026-03-14')
  })

  it('empties the value when clear is pressed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DatePicker
        label="Departure"
        name="departure"
        defaultValue="2026-03-18"
        onChange={onChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Clear' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(null)
    expect(hiddenInput('departure')).toHaveValue('')
    expect(
      screen.queryByRole('button', { name: 'Clear' }),
    ).not.toBeInTheDocument()
    expect(calendarButton()).toHaveFocus()
  })

  it('replaces the calendar button with a spinner while loading', () => {
    render(<DatePicker label="Departure" loading />)

    expect(screen.getByRole('group', { name: 'Departure' })).toHaveAttribute(
      'aria-busy',
      'true',
    )
    expect(
      screen.queryByRole('button', { name: 'Calendar' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
  })

  it('ignores Alt+ArrowDown in a segment while loading', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Departure" loading />)

    await user.click(segments()[0])
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('blocks a native form submit while a required field is empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <DatePicker label="Departure" name="departure" required />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).not.toHaveBeenCalled()

    await typeInto(user, segments()[0], '03182026')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('opens the panel on Alt+ArrowDown from a segment', async () => {
    const user = userEvent.setup()
    render(<DatePicker label="Departure" defaultValue="2026-03-18" />)

    await user.click(segments()[0])
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}')

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(segments()[0]).toHaveTextContent(/^3$/)
  })
})
