import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Calendar, CalendarMode } from '@/registry/ui/calendar'

function dayButton(dayLabel: string) {
  return screen.getByRole('button', {
    name: new RegExp(`${dayLabel}( selected)?$`),
  })
}

function dayCell(dayLabel: string) {
  return dayButton(dayLabel).closest('[role="gridcell"]')
}

function weekdayHeaders() {
  return screen.getAllByRole('columnheader', { hidden: true })
}

describe('Calendar', () => {
  it('reports a clicked day in single mode as an ISO string', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Departure"
        value="2026-03-10"
        onChange={onChange}
      />,
    )

    await user.click(dayButton('March 18, 2026'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('2026-03-18')
  })

  it('reports a range once, after the second pick, as an ordered pair', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Trip dates"
        mode={CalendarMode.Range}
        value={{ start: '2026-03-02', end: '2026-03-04' }}
        onChange={onChange}
      />,
    )

    await user.click(dayButton('March 10, 2026'))
    expect(onChange).not.toHaveBeenCalled()

    await user.click(dayButton('March 14, 2026'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      start: '2026-03-10',
      end: '2026-03-14',
    })
  })

  it('normalizes a range picked end-first so start is the earlier day', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Trip dates"
        mode={CalendarMode.Range}
        value={{ start: '2026-03-02', end: '2026-03-04' }}
        onChange={onChange}
      />,
    )

    await user.click(dayButton('March 14, 2026'))
    await user.click(dayButton('March 10, 2026'))

    expect(onChange).toHaveBeenCalledWith({
      start: '2026-03-10',
      end: '2026-03-14',
    })
  })

  it('refuses a day before min and disables the previous button in that month', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Departure"
        value="2026-03-10"
        min="2026-03-05"
        onChange={onChange}
      />,
    )

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()

    await user.click(dayButton('March 4, 2026'))

    expect(onChange).not.toHaveBeenCalled()
    expect(dayCell('March 4, 2026')).toHaveAttribute('aria-disabled', 'true')
  })

  it('does not select a day that isDateDisabled refuses', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const isDateDisabled = vi.fn((date: string) => date === '2026-03-12')
    render(
      <Calendar
        aria-label="Departure"
        value="2026-03-10"
        isDateDisabled={isDateDisabled}
        onChange={onChange}
      />,
    )

    await user.click(dayButton('March 12, 2026'))

    expect(onChange).not.toHaveBeenCalled()
    expect(dayCell('March 12, 2026')).not.toHaveAttribute(
      'aria-selected',
      'true',
    )
    for (const [date] of isDateDisabled.mock.calls) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('restores the committed range on Escape after the first pick and fires nothing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Calendar
        aria-label="Trip dates"
        mode={CalendarMode.Range}
        value={{ start: '2026-03-02', end: '2026-03-04' }}
        onChange={onChange}
      />,
    )

    await user.click(dayButton('March 10, 2026'))
    await user.keyboard('{Escape}')

    expect(onChange).not.toHaveBeenCalled()
    expect(dayCell('March 2, 2026')).toHaveAttribute('aria-selected', 'true')
    expect(dayCell('March 4, 2026')).toHaveAttribute('aria-selected', 'true')
    expect(dayCell('March 10, 2026')).not.toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('starts the week on Monday under a German locale', () => {
    render(<Calendar aria-label="Abreise" value="2026-03-10" locale="de-DE" />)

    const [firstWeekday] = weekdayHeaders()
    expect(firstWeekday).toHaveTextContent(/^Mo/)
  })

  it('starts the week on Sunday under the default locale', () => {
    render(<Calendar aria-label="Departure" value="2026-03-10" />)

    const [firstWeekday] = weekdayHeaders()
    expect(firstWeekday).toHaveTextContent(/^Sun/)
  })

  it('names the grid with the aria-label it was given', () => {
    render(<Calendar aria-label="Departure" value="2026-03-10" />)

    expect(screen.getByRole('grid', { name: /^Departure/ })).toBeInTheDocument()
  })

  it('renders two grids side by side for months={2}', () => {
    render(
      <Calendar
        aria-label="Trip dates"
        mode={CalendarMode.Range}
        months={2}
        value={{ start: '2026-03-02', end: '2026-03-04' }}
      />,
    )

    expect(screen.getAllByRole('grid')).toHaveLength(2)
    expect(screen.getByText('March 2026')).toBeInTheDocument()
    expect(screen.getByText('April 2026')).toBeInTheDocument()
  })

  it('takes the grid out of the tab order when the whole calendar is disabled', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Calendar aria-label="Departure" value="2026-03-10" disabled />
        <button type="button">After</button>
      </>,
    )

    await user.tab()

    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })
})
