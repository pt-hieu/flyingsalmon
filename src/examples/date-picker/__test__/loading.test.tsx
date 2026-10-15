import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { DatePickerLoading } from '@/examples/date-picker/loading'

async function advance(milliseconds: number) {
  await act(() => vi.advanceTimersByTimeAsync(milliseconds))
}

function segments() {
  return screen.getAllByRole('spinbutton')
}

async function typeDeparture(
  user: ReturnType<typeof userEvent.setup>,
  digits: string,
) {
  await user.click(segments()[0])
  await user.keyboard(digits)
}

describe('DatePickerLoading', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date(2026, 9, 16, 12))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('says a Monday flight is sold out once it is checked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<DatePickerLoading />)

    await typeDeparture(user, '10192026')
    await advance(1000)

    expect(screen.getByText('That flight is sold out')).toBeInTheDocument()
  })

  it('finds seats on a Tuesday', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<DatePickerLoading />)

    await typeDeparture(user, '10202026')
    await advance(1000)

    expect(
      screen.queryByText('That flight is sold out'),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('group', { name: 'Departure' }),
    ).not.toHaveAttribute('aria-busy')
  })
})
