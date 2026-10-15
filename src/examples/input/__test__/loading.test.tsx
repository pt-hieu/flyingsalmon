import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InputLoading } from '@/examples/input/loading'

async function advance(milliseconds: number) {
  await act(() => vi.advanceTimersByTimeAsync(milliseconds))
}

function emailField() {
  return screen.getByRole('textbox', { name: 'Invite by email' })
}

describe('InputLoading', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('says Linh is already on the trip once her email is checked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<InputLoading />)

    await user.type(emailField(), 'linh@example.com')
    await user.tab()
    await advance(1000)

    expect(screen.getByText('Linh is already on this trip')).toBeInTheDocument()
  })

  it('drops the answer for an email the traveller has since changed', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<InputLoading />)

    await user.type(emailField(), 'linh@example.com')
    await user.tab()
    await advance(400)
    await user.clear(emailField())
    await user.type(emailField(), 'mai@example.com')
    await user.tab()
    await advance(700)

    expect(
      screen.queryByText('Linh is already on this trip'),
    ).not.toBeInTheDocument()
    expect(emailField()).toHaveAttribute('aria-busy', 'true')

    await advance(400)

    expect(
      screen.queryByText('Linh is already on this trip'),
    ).not.toBeInTheDocument()
    expect(emailField()).not.toHaveAttribute('aria-busy')
  })
})
