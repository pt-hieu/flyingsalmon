import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DialogDemo } from '@/examples/dialog/demo'

function plannedDestinations() {
  return screen
    .queryAllByText(/^(Lisbon|Hanoi)$/)
    .map((title) => title.textContent)
}

async function planTrip(
  user: ReturnType<typeof userEvent.setup>,
  destination: string,
) {
  await user.click(screen.getByRole('button', { name: 'Plan a trip' }))
  const dialog = screen.getByRole('dialog')
  await user.type(
    within(dialog).getByRole('textbox', { name: 'Destination' }),
    destination,
  )
  await user.click(within(dialog).getByRole('button', { name: 'Plan trip' }))
}

describe('DialogDemo', () => {
  it('lists each planned trip above the earlier ones', async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    await planTrip(user, 'Lisbon')
    await planTrip(user, 'Lisbon')

    expect(plannedDestinations()).toEqual(['Lisbon', 'Lisbon', 'Hanoi'])
    expect(screen.getByText('Mar 3, 2026 to Mar 9, 2026')).toBeInTheDocument()
  })

  it('asks for a destination instead of planning an empty trip', async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    await user.click(screen.getByRole('button', { name: 'Plan a trip' }))
    await user.click(screen.getByRole('button', { name: 'Plan trip' }))

    expect(screen.getByText('Where are you going?')).toBeInTheDocument()
    expect(plannedDestinations()).toEqual(['Hanoi'])
  })
})
