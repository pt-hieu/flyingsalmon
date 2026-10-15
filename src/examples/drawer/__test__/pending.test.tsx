import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { DrawerPending } from '@/examples/drawer/pending'
import { TooltipProvider } from '@/registry/ui/tooltip'

async function advance(milliseconds: number) {
  await act(() => vi.advanceTimersByTimeAsync(milliseconds))
}

async function invite(user: ReturnType<typeof userEvent.setup>, email: string) {
  await user.click(screen.getByRole('button', { name: 'Invite a traveller' }))
  const drawer = screen.getByRole('dialog')
  await user.type(within(drawer).getByRole('textbox', { name: 'Email' }), email)
  await user.click(within(drawer).getByRole('button', { name: 'Invite' }))
  await advance(1200)
}

describe('DrawerPending', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('adds a traveller once their email is found', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(
      <TooltipProvider>
        <DrawerPending />
      </TooltipProvider>,
    )

    await invite(user, 'mai@example.com')

    expect(screen.getByRole('img', { name: 'Mai Tran' })).toBeInTheDocument()
  })

  it('refuses to invite a traveller who is already on the trip', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(
      <TooltipProvider>
        <DrawerPending />
      </TooltipProvider>,
    )

    await invite(user, 'mai@example.com')
    await invite(user, 'mai@example.com')

    expect(
      screen.getByText('Mai Tran is already on this trip.'),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('img', { name: 'Mai Tran', hidden: true }),
    ).toHaveLength(1)
  })
})
