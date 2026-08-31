import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Spinner } from '@/registry/ui/spinner'

describe('Spinner', () => {
  it('announces itself as a status named "Loading" by default', () => {
    render(<Spinner />)

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('takes its accessible name from the label prop', () => {
    render(<Spinner label="Saving your trip" />)

    expect(
      screen.getByRole('status', { name: 'Saving your trip' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('status', { name: 'Loading' }),
    ).not.toBeInTheDocument()
  })

  it('leaves the accessibility tree when a parent component owns the announcement', () => {
    render(<Spinner aria-hidden />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('costs no tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Spinner />
        <button type="button">After the spinner</button>
      </>,
    )

    await user.tab()

    expect(
      screen.getByRole('button', { name: 'After the spinner' }),
    ).toHaveFocus()
  })
})
