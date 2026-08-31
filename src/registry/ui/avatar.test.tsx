import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Avatar } from '@/registry/ui/avatar'

describe('Avatar', () => {
  it('shows the image named by the person when a src is given', () => {
    render(<Avatar src="/ada.png" name="Ada Lovelace" />)

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute(
      'src',
      '/ada.png',
    )
    expect(screen.queryByText('AL')).not.toBeInTheDocument()
  })

  it('takes its accessible name from alt when both alt and name are given', () => {
    render(<Avatar src="/ada.png" name="Ada Lovelace" alt="Trip owner" />)

    expect(screen.getByRole('img', { name: 'Trip owner' })).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'Ada Lovelace' }),
    ).not.toBeInTheDocument()
  })

  it('shows initials instead of an image when there is no src', () => {
    const { container } = render(<Avatar name="Ada Lovelace" />)

    expect(screen.getByText('AL')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeNull()
  })

  it('swaps a broken image for the initials', () => {
    const { container } = render(
      <Avatar src="/missing.png" name="Ada Lovelace" />,
    )
    expect(screen.queryByText('AL')).not.toBeInTheDocument()

    fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' }))

    expect(screen.getByText('AL')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeNull()
  })

  it('builds the initials from the first and last word of the name', () => {
    render(
      <>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Brewster Murray Hopper" />
        <Avatar name="Prince" />
        <Avatar name="katherine johnson" />
        <Avatar name="  Alan   Turing  " />
      </>,
    )

    expect(screen.getByText('AL')).toBeInTheDocument()
    expect(screen.getByText('GH')).toBeInTheDocument()
    expect(screen.getByText('P')).toBeInTheDocument()
    expect(screen.getByText('KJ')).toBeInTheDocument()
    expect(screen.getByText('AT')).toBeInTheDocument()
  })

  it('draws a plain circle with no glyph when there is no name and no src', () => {
    const { container } = render(<Avatar />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.textContent).toBe('')
  })

  it('still shows the image when there is a src but no name', () => {
    const { container } = render(<Avatar src="/ada.png" />)

    expect(container.querySelector('img')).toHaveAttribute('src', '/ada.png')
    expect(container.textContent).toBe('')
  })

  it('falls back to a plain circle when a nameless image breaks', () => {
    const { container } = render(<Avatar src="/missing.png" />)

    fireEvent.error(container.querySelector('img')!)

    expect(container.querySelector('img')).toBeNull()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.textContent).toBe('')
  })

  it('names the initials fallback after the person for assistive tech', () => {
    render(<Avatar name="Ada Lovelace" />)

    expect(
      screen.getByRole('img', { name: 'Ada Lovelace' }),
    ).toBeInTheDocument()
  })

  it('names the initials fallback after alt when both alt and name are given', () => {
    render(<Avatar name="Ada Lovelace" alt="Trip owner" />)

    expect(screen.getByRole('img', { name: 'Trip owner' })).toBeInTheDocument()
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  it('hides the initials fallback from assistive tech when alt is empty', () => {
    render(<Avatar name="Ada Lovelace" alt="" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  it('hides a decorative image from assistive tech when alt is empty', () => {
    render(<Avatar src="/ada.png" name="Ada Lovelace" alt="" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('goes back to the image when the src changes after a failure', () => {
    const { container, rerender } = render(
      <Avatar src="/missing.png" name="Ada Lovelace" />,
    )
    fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' }))
    expect(container.querySelector('img')).toBeNull()

    rerender(<Avatar src="/ada.png" name="Ada Lovelace" />)

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute(
      'src',
      '/ada.png',
    )
    expect(screen.queryByText('AL')).not.toBeInTheDocument()
  })

  it('costs no tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Avatar name="Ada Lovelace" />
        <Avatar src="/ada.png" name="Grace Hopper" />
        <button type="button">After the avatars</button>
      </>,
    )

    await user.tab()

    expect(
      screen.getByRole('button', { name: 'After the avatars' }),
    ).toHaveFocus()
  })
})
