import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Slider } from '@/registry/ui/slider'

const budgetLevels = [
  'Easy on the wallet',
  'Careful',
  'Modest',
  'Comfortable',
  'Generous',
  'Splurge',
  'Treat ourselves',
]

function BudgetSlider({
  initialLevel = 3,
  onValueChange,
  disabled,
}: {
  initialLevel?: number
  onValueChange?: (value: number) => void
  disabled?: boolean
}) {
  const [level, setLevel] = useState(initialLevel)

  return (
    <Slider
      label="Budget"
      min={0}
      max={6}
      step={1}
      value={level}
      description={budgetLevels[level]}
      disabled={disabled}
      onValueChange={(nextLevel) => {
        setLevel(nextLevel)
        onValueChange?.(nextLevel)
      }}
    />
  )
}

describe('Slider', () => {
  it('names the thumb with the label and announces the description as its value', () => {
    render(<BudgetSlider />)

    const thumb = screen.getByRole('slider', { name: 'Budget' })

    expect(thumb).toHaveAttribute('aria-valuenow', '3')
    expect(thumb).toHaveAttribute('aria-valuetext', 'Comfortable')
  })

  it('shows the description of the current step', () => {
    render(<BudgetSlider />)

    expect(screen.getByText('Comfortable')).toBeVisible()
  })

  it('moves one step with the arrow keys and reports the new value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BudgetSlider onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    expect(onValueChange).toHaveBeenLastCalledWith(4)
    expect(screen.getByRole('slider', { name: 'Budget' })).toHaveAttribute(
      'aria-valuetext',
      'Generous',
    )

    await user.keyboard('{ArrowLeft}{ArrowLeft}')

    expect(onValueChange).toHaveBeenLastCalledWith(2)
    expect(screen.getByText('Modest')).toBeVisible()
  })

  it('jumps to the ends with Home and End', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BudgetSlider onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{End}')

    expect(onValueChange).toHaveBeenLastCalledWith(6)
    expect(screen.getByText('Treat ourselves')).toBeVisible()

    await user.keyboard('{Home}')

    expect(onValueChange).toHaveBeenLastCalledWith(0)
    expect(screen.getByText('Easy on the wallet')).toBeVisible()
  })

  it('stops at the ends', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BudgetSlider initialLevel={6} onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('slider', { name: 'Budget' })).toHaveAttribute(
      'aria-valuenow',
      '6',
    )
  })

  it('takes no focus and ignores keys while disabled', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BudgetSlider disabled onValueChange={onValueChange} />)

    await user.tab()

    expect(screen.getByRole('slider', { name: 'Budget' })).not.toHaveFocus()

    await user.keyboard('{ArrowRight}')

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('posts the value under its name in a form', () => {
    render(
      <form aria-label="Trip">
        <Slider
          label="Budget"
          name="budgetLevel"
          min={0}
          max={6}
          step={1}
          value={2}
          onValueChange={() => {}}
        />
      </form>,
    )

    const form = screen.getByRole('form', { name: 'Trip' })

    expect(new FormData(form as HTMLFormElement).get('budgetLevel')).toBe('2')
  })

  it('renders the action beside the track', () => {
    render(
      <Slider
        label="Budget"
        min={0}
        max={6}
        step={1}
        value={2}
        onValueChange={() => {}}
        action={<button type="button">I have a number</button>}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'I have a number' }),
    ).toBeVisible()
  })
})
