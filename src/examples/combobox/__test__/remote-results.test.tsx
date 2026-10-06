import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ComboboxRemoteResults } from '@/examples/combobox/remote-results'

function optionNames() {
  return screen.queryAllByRole('option').map((option) => option.textContent)
}

async function advance(milliseconds: number) {
  await act(() => vi.advanceTimersByTimeAsync(milliseconds))
}

describe('ComboboxRemoteResults', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows only the results for the latest query when an earlier search answers late', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ComboboxRemoteResults />)
    const input = screen.getByRole('combobox', { name: 'Where are you going?' })

    await user.type(input, 're')
    await advance(400)
    await user.type(input, 'i')
    await advance(500)

    expect(optionNames().join(' ')).not.toMatch(/Reykjavík|Rennes/)

    await advance(500)

    expect(optionNames()).toHaveLength(1)
    expect(optionNames()[0]).toMatch(/^Reims/)
  })

  it('says nothing matches once a search returns no places', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ComboboxRemoteResults />)

    await user.type(
      screen.getByRole('combobox', { name: 'Where are you going?' }),
      'zz',
    )
    await advance(1000)

    expect(screen.getByText('No place matches that')).toBeInTheDocument()
  })
})
