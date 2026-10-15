import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { NumberFieldLoading } from '@/examples/number-field/loading'

async function advance(milliseconds: number) {
  await act(() => vi.advanceTimersByTimeAsync(milliseconds))
}

function budgetField() {
  return screen.getByRole('spinbutton', { name: 'Budget per person' })
}

describe('NumberFieldLoading', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('keeps pricing and shows no count until the latest budget is priced', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<NumberFieldLoading />)
    await user.click(budgetField())

    await user.keyboard('{ArrowUp}')
    await advance(400)
    await user.keyboard('{ArrowUp}')
    await advance(500)

    expect(screen.queryByText(/trips fit this budget/)).not.toBeInTheDocument()
    expect(budgetField()).toHaveAttribute('aria-busy', 'true')

    await advance(400)

    expect(screen.getByText('13 trips fit this budget')).toBeInTheDocument()
    expect(budgetField()).not.toHaveAttribute('aria-busy')
  })
})
