import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Switch, SwitchSize } from '@/registry/ui/switch'

describe('Switch', () => {
  it('toggles on with Space and back off with Space', async () => {
    const user = userEvent.setup()
    render(<Switch label="Wi-Fi" />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })
    expect(control).not.toBeChecked()

    control.focus()
    await user.keyboard(' ')
    expect(control).toBeChecked()

    await user.keyboard(' ')
    expect(control).not.toBeChecked()
  })

  it('toggles with Enter', async () => {
    const user = userEvent.setup()
    render(<Switch label="Wi-Fi" />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    control.focus()
    await user.keyboard('{Enter}')

    expect(control).toBeChecked()
  })

  it('toggles from the keyboard and from its label at the small size', async () => {
    const user = userEvent.setup()
    render(<Switch label="Wi-Fi" size={SwitchSize.Small} />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    control.focus()
    await user.keyboard(' ')
    expect(control).toBeChecked()

    await user.click(screen.getByText('Wi-Fi'))
    expect(control).not.toBeChecked()
  })

  it('toggles when the label is clicked', async () => {
    const user = userEvent.setup()
    render(<Switch label="Wi-Fi" />)

    await user.click(screen.getByText('Wi-Fi'))

    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).toBeChecked()
  })

  it('wires two switches on the same page to their own labels', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Switch label="Wi-Fi" />
        <Switch label="Bluetooth" />
      </>,
    )

    await user.click(screen.getByText('Bluetooth'))

    expect(screen.getByRole('switch', { name: 'Bluetooth' })).toBeChecked()
    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).not.toBeChecked()
  })

  it('honours a caller-supplied id for the label wiring', async () => {
    const user = userEvent.setup()
    render(<Switch id="wifi-toggle" label="Wi-Fi" />)

    await user.click(screen.getByText('Wi-Fi'))

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    expect(control).toHaveAttribute('id', 'wifi-toggle')
    expect(control).toBeChecked()
  })

  it('reports the new value to onCheckedChange', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch label="Wi-Fi" onCheckedChange={onCheckedChange} />)

    await user.click(screen.getByRole('switch', { name: 'Wi-Fi' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('follows the checked prop when the app controls it', () => {
    const { rerender } = render(<Switch label="Wi-Fi" checked={false} />)

    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).not.toBeChecked()

    rerender(<Switch label="Wi-Fi" checked />)

    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).toBeChecked()
  })

  it('ignores a click while loading and keeps the switch focusable', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch label="Wi-Fi" loading onCheckedChange={onCheckedChange} />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    await user.click(control)

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(control).not.toBeChecked()
    expect(control).toBeEnabled()
  })

  it('ignores Space and Enter while loading and keeps focus', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch label="Wi-Fi" loading onCheckedChange={onCheckedChange} />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    await user.tab()
    expect(control).toHaveFocus()

    await user.keyboard(' ')
    await user.keyboard('{Enter}')

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(control).not.toBeChecked()
    expect(control).toHaveFocus()
  })

  it('ignores a label click while loading', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch label="Wi-Fi" loading onCheckedChange={onCheckedChange} />)

    await user.click(screen.getByText('Wi-Fi'))

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).not.toBeChecked()
  })

  it('announces the lock with aria-disabled while loading', () => {
    render(<Switch label="Wi-Fi" loading />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    expect(control).toHaveAttribute('aria-disabled', 'true')
    expect(control).not.toHaveAttribute('disabled')
  })

  it('is not aria-disabled when it is not loading', () => {
    render(<Switch label="Wi-Fi" />)

    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).not.toHaveAttribute(
      'aria-disabled',
    )
  })

  it('keeps reporting the checked state the app set while loading', () => {
    render(<Switch label="Wi-Fi" loading checked />)

    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch label="Wi-Fi" disabled onCheckedChange={onCheckedChange} />)

    const control = screen.getByRole('switch', { name: 'Wi-Fi' })

    expect(control).toBeDisabled()

    await user.click(control)
    await user.click(screen.getByText('Wi-Fi'))

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(control).not.toBeChecked()
  })

  it('renders without a label and takes its name from the caller', () => {
    render(<Switch aria-label="Airplane mode" />)

    expect(
      screen.getByRole('switch', { name: 'Airplane mode' }),
    ).toBeInTheDocument()
  })

  it('starts on when defaultChecked is set', () => {
    render(<Switch label="Wi-Fi" defaultChecked />)

    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).toBeChecked()
  })

  it('calls a caller onClick and still toggles', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Switch label="Wi-Fi" onClick={onClick} />)

    await user.click(screen.getByRole('switch', { name: 'Wi-Fi' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('switch', { name: 'Wi-Fi' })).toBeChecked()
  })
})
