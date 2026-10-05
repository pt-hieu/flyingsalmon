import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CheckboxSelectAll } from '@/examples/checkbox/select-all'

function checkbox(name: string) {
  return screen.getByRole('checkbox', { name })
}

describe('CheckboxSelectAll', () => {
  it('shows All places as partly checked while only some places are', () => {
    render(<CheckboxSelectAll />)

    expect(checkbox('All places')).toBePartiallyChecked()
    expect(checkbox('Belém')).toBeChecked()
    expect(checkbox('Alfama')).not.toBeChecked()
  })

  it('checks every place from All places, then clears them all', async () => {
    const user = userEvent.setup()
    render(<CheckboxSelectAll />)

    await user.click(checkbox('All places'))

    expect(checkbox('All places')).toBeChecked()
    expect(checkbox('Alfama')).toBeChecked()
    expect(checkbox('Belém')).toBeChecked()
    expect(checkbox('Sintra')).toBeChecked()

    await user.click(checkbox('All places'))

    expect(checkbox('All places')).not.toBeChecked()
    expect(checkbox('Alfama')).not.toBeChecked()
    expect(checkbox('Belém')).not.toBeChecked()
    expect(checkbox('Sintra')).not.toBeChecked()
  })

  it('checks All places once the last place is checked', async () => {
    const user = userEvent.setup()
    render(<CheckboxSelectAll />)

    await user.click(checkbox('Alfama'))
    await user.click(checkbox('Sintra'))

    expect(checkbox('All places')).toBeChecked()
  })
})
