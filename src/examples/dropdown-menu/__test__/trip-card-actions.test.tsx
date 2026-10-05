import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DropdownMenuTripCardActions } from '@/examples/dropdown-menu/trip-card-actions'

function tripNamesInOrder() {
  return screen
    .getAllByRole('button', { name: /^Actions for /, hidden: true })
    .map((button) =>
      button.getAttribute('aria-label')?.replace('Actions for ', ''),
    )
}

describe('DropdownMenuTripCardActions', () => {
  it('puts a duplicated trip directly after the original', async () => {
    const user = userEvent.setup()
    render(<DropdownMenuTripCardActions />)

    await user.click(
      screen.getByRole('button', { name: 'Actions for Kyoto in autumn' }),
    )
    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }))

    expect(tripNamesInOrder()).toEqual([
      'Kyoto in autumn',
      'Kyoto in autumn (copy)',
      'Lisbon long weekend',
    ])
  })

  it('removes a trip only after the delete is confirmed', async () => {
    const user = userEvent.setup()
    render(<DropdownMenuTripCardActions />)

    await user.click(
      screen.getByRole('button', { name: 'Actions for Lisbon long weekend' }),
    )
    await user.click(screen.getByRole('menuitem', { name: 'Delete trip' }))

    expect(tripNamesInOrder()).toEqual([
      'Kyoto in autumn',
      'Lisbon long weekend',
    ])

    await user.click(screen.getByRole('button', { name: 'Delete trip' }))

    expect(tripNamesInOrder()).toEqual(['Kyoto in autumn'])
  })
})
