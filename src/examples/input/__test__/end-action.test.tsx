import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InputEndAction } from '@/examples/input/end-action'

describe('InputEndAction', () => {
  it('confirms the copy once the invite link is on the clipboard', async () => {
    const user = userEvent.setup()
    render(<InputEndAction />)

    await user.click(screen.getByRole('button', { name: 'Copy invite link' }))

    expect(
      screen.getByRole('button', { name: 'Invite link copied' }),
    ).toBeInTheDocument()
    await expect(navigator.clipboard.readText()).resolves.toBe(
      'https://example.com/join/lisbon-long-weekend',
    )
  })

  it('says the link was not copied when the clipboard refuses it', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new DOMException('Write permission denied', 'NotAllowedError'),
    )
    render(<InputEndAction />)

    await user.click(screen.getByRole('button', { name: 'Copy invite link' }))

    expect(
      screen.getByText('The link was not copied. Select it and copy it.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Copy invite link' }),
    ).toBeInTheDocument()
  })
})
