import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { NumberField } from '@/registry/ui/number-field'

describe('NumberField', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('focuses the field when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Group size" />)

    await user.click(screen.getByText('Group size'))

    expect(screen.getByLabelText('Group size')).toHaveFocus()
  })

  it('marks the field invalid and describes it with the error message', () => {
    render(<NumberField label="Group size" error="Enter at least one guest" />)

    const field = screen.getByLabelText('Group size')

    expect(field).toBeInvalid()
    expect(field).toHaveAccessibleDescription('Enter at least one guest')
  })

  it('reports a number rather than the text that was typed', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NumberField
        label="Budget"
        locale="en-US"
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByLabelText('Budget'))
    await user.keyboard('1500')
    await user.tab()

    expect(onValueChange).toHaveBeenLastCalledWith(1500)
    expect(screen.getByLabelText('Budget')).toHaveValue('1,500')
  })

  it('reports null once the field is cleared', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NumberField
        label="Budget"
        defaultValue={40}
        onValueChange={onValueChange}
      />,
    )

    await user.clear(screen.getByLabelText('Budget'))
    await user.tab()

    expect(onValueChange).toHaveBeenLastCalledWith(null)
    expect(screen.getByLabelText('Budget')).toHaveValue('')
  })

  it('steps by the step with the arrow keys and stops at the bounds', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Group size" defaultValue={2} min={1} max={3} />)

    const field = screen.getByLabelText('Group size')
    await user.click(field)

    await user.keyboard('{ArrowUp}')
    expect(field).toHaveValue('3')

    await user.keyboard('{ArrowUp}')
    expect(field).toHaveValue('3')

    await user.keyboard('{ArrowDown}{ArrowDown}')
    expect(field).toHaveValue('1')

    await user.keyboard('{ArrowDown}')
    expect(field).toHaveValue('1')
  })

  it('steps by the large step with the page keys and shifted arrows', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Budget" defaultValue={100} step={5} />)

    const field = screen.getByLabelText('Budget')
    await user.click(field)

    await user.keyboard('{PageUp}')
    expect(field).toHaveValue('150')

    await user.keyboard('{PageDown}')
    expect(field).toHaveValue('100')

    await user.keyboard('{Shift>}{ArrowUp}{/Shift}')
    expect(field).toHaveValue('150')

    await user.keyboard('{Shift>}{ArrowDown}{/Shift}')
    expect(field).toHaveValue('100')
  })

  it('jumps to a bound with Home and End when that bound is set', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Nights" defaultValue={5} min={1} max={30} />)

    const field = screen.getByLabelText('Nights')
    await user.click(field)

    await user.keyboard('{End}')
    expect(field).toHaveValue('30')

    await user.keyboard('{Home}')
    expect(field).toHaveValue('1')
  })

  it('leaves the value alone on Home and End when no bounds are set', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Nights" defaultValue={5} />)

    const field = screen.getByLabelText('Nights')
    await user.click(field)

    await user.keyboard('{End}{Home}')

    expect(field).toHaveValue('5')
  })

  it('clamps into the bounds and reformats in the locale on blur', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NumberField
        label="Budget"
        locale="de-DE"
        max={2000}
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByLabelText('Budget'))
    await user.keyboard('2500')
    await user.tab()

    expect(screen.getByLabelText('Budget')).toHaveValue('2.000')
    expect(onValueChange).toHaveBeenLastCalledWith(2000)
  })

  it('accepts grouped text in the locale it formats with', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NumberField
        label="Budget"
        locale="de-DE"
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByLabelText('Budget'))
    await user.keyboard('1.500')
    await user.tab()

    expect(onValueChange).toHaveBeenLastCalledWith(1500)
    expect(screen.getByLabelText('Budget')).toHaveValue('1.500')
  })

  it('reverts to the last committed value when the text cannot be parsed', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NumberField
        label="Nights"
        defaultValue={12}
        onValueChange={onValueChange}
      />,
    )

    const field = screen.getByLabelText('Nights')
    await user.clear(field)
    await user.keyboard('two weeks')
    await user.tab()

    expect(field).toHaveValue('12')
    expect(onValueChange).toHaveBeenLastCalledWith(12)
  })

  it('commits on Enter without leaving the field', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Budget" locale="en-US" max={2000} />)

    const field = screen.getByLabelText('Budget')
    await user.click(field)
    await user.keyboard('2500{Enter}')

    expect(field).toHaveValue('2,000')
    expect(field).toHaveFocus()
  })

  it('repeats the step while the increase button is held', async () => {
    vi.useFakeTimers()
    render(<NumberField label="Group size" defaultValue={0} />)

    const field = screen.getByLabelText('Group size')
    const increase = screen.getByRole('button', { name: 'Increase' })

    fireEvent.pointerDown(increase)
    expect(field).toHaveValue('1')

    await act(async () => {
      vi.advanceTimersByTime(400)
    })
    expect(field).toHaveValue('1')

    await act(async () => {
      vi.advanceTimersByTime(180)
    })
    expect(field).toHaveValue('4')

    fireEvent.pointerUp(increase)

    await act(async () => {
      vi.advanceTimersByTime(600)
    })
    expect(field).toHaveValue('4')
  })

  it('disables only the spin button that would cross a bound', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Group size" defaultValue={2} min={1} max={3} />)

    const decrease = screen.getByRole('button', { name: 'Decrease' })
    const increase = screen.getByRole('button', { name: 'Increase' })

    expect(decrease).not.toHaveAttribute('aria-disabled')
    expect(increase).not.toHaveAttribute('aria-disabled')

    await user.click(increase)

    expect(screen.getByLabelText('Group size')).toHaveValue('3')
    expect(increase).toHaveAttribute('aria-disabled', 'true')
    expect(decrease).not.toHaveAttribute('aria-disabled')
  })

  it('carries the prefix and the unit in the value text', () => {
    render(
      <NumberField
        label="Budget"
        locale="en-US"
        prefix="$"
        unit="per person"
        defaultValue={1500}
      />,
    )

    expect(screen.getByLabelText('Budget')).toHaveAttribute(
      'aria-valuetext',
      '$1,500 per person',
    )
  })

  it('omits both value attributes while the field is empty', () => {
    render(<NumberField label="Budget" prefix="$" unit="per person" />)

    const field = screen.getByLabelText('Budget')

    expect(field).not.toHaveAttribute('aria-valuenow')
    expect(field).not.toHaveAttribute('aria-valuetext')
  })

  it('posts the raw number under name, never the formatted text', () => {
    const { container } = render(
      <form>
        <NumberField
          label="Budget"
          locale="de-DE"
          name="budgetPerPerson"
          defaultValue={1500}
        />
      </form>,
    )

    const formData = new FormData(container.querySelector('form')!)

    expect(screen.getByLabelText('Budget')).toHaveValue('1.500')
    expect([...formData.entries()]).toEqual([['budgetPerPerson', '1500']])
  })

  it('posts an empty string under name while the field is empty', () => {
    const { container } = render(
      <form>
        <NumberField label="Budget" name="budgetPerPerson" />
      </form>,
    )

    const formData = new FormData(container.querySelector('form')!)

    expect(formData.get('budgetPerPerson')).toBe('')
  })

  it('posts nothing at all while the field is disabled', () => {
    const { container } = render(
      <form>
        <NumberField
          label="Budget"
          name="budgetPerPerson"
          defaultValue={1500}
          disabled
        />
      </form>,
    )

    const formData = new FormData(container.querySelector('form')!)

    expect(formData.get('budgetPerPerson')).toBeNull()
  })

  it('ignores the wheel over the field', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NumberField
        label="Group size"
        defaultValue={4}
        onValueChange={onValueChange}
      />,
    )

    const field = screen.getByLabelText('Group size')
    await user.click(field)
    fireEvent.wheel(field, { deltaY: -120 })

    expect(field).toHaveValue('4')
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
