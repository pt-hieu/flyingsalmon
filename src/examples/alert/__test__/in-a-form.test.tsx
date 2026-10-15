import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AlertInAForm } from '@/examples/alert/in-a-form'

describe('AlertInAForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('clears the failed invite when the form is reset', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<AlertInAForm />)

    await user.click(screen.getByRole('button', { name: 'Invite traveller' }))
    await act(() => vi.advanceTimersByTimeAsync(800))

    expect(screen.getByText('The invite was not sent')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    await act(() => vi.advanceTimersByTimeAsync(1000))

    expect(
      screen.queryByText('The invite was not sent'),
    ).not.toBeInTheDocument()
  })
})
