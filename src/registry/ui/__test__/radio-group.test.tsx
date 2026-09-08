import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupOrientation,
} from '@/registry/ui/radio-group'

function DeliverySpeedGroup(
  props: Partial<React.ComponentProps<typeof RadioGroup>> = {},
) {
  return (
    <RadioGroup label="Delivery speed" {...props}>
      <RadioGroupItem value="standard" label="Standard" />
      <RadioGroupItem value="express" label="Express" />
      <RadioGroupItem value="overnight" label="Overnight" />
    </RadioGroup>
  )
}

function ControlledDeliverySpeed() {
  const [selectedSpeed, setSelectedSpeed] = useState('standard')

  return (
    <>
      <DeliverySpeedGroup
        value={selectedSpeed}
        onValueChange={setSelectedSpeed}
      />
      <p>Chosen: {selectedSpeed}</p>
    </>
  )
}

async function pressAndRelease(
  user: ReturnType<typeof userEvent.setup>,
  key: string,
) {
  await user.keyboard(`{${key}>}`)
  await user.keyboard(`{/${key}}`)
}

describe('RadioGroup', () => {
  it('exposes a radiogroup named by its label', () => {
    render(<DeliverySpeedGroup />)

    expect(
      screen.getByRole('radiogroup', { name: 'Delivery speed' }),
    ).toBeInTheDocument()
  })

  it('renders every item as a radio named by its own label', () => {
    render(<DeliverySpeedGroup />)

    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(screen.getByRole('radio', { name: 'Express' })).toBeInTheDocument()
  })

  it('selects an item when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<DeliverySpeedGroup />)

    await user.click(screen.getByText('Express'))

    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Standard' })).not.toBeChecked()
  })

  it('wires two groups on the same page to their own item labels', async () => {
    const user = userEvent.setup()
    render(
      <>
        <RadioGroup label="Delivery speed">
          <RadioGroupItem value="standard" label="Standard" />
        </RadioGroup>
        <RadioGroup label="Gift wrap">
          <RadioGroupItem value="standard" label="Standard" />
        </RadioGroup>
      </>,
    )

    const [firstStandardLabel, secondStandardLabel] =
      screen.getAllByText('Standard')
    await user.click(secondStandardLabel)

    const [firstStandardRadio, secondStandardRadio] =
      screen.getAllByRole('radio')
    expect(secondStandardRadio).toBeChecked()
    expect(firstStandardRadio).not.toBeChecked()
    expect(firstStandardLabel).toBeInTheDocument()
  })

  it('honours a caller-supplied id on an item for its label wiring', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup label="Delivery speed">
        <RadioGroupItem id="speed-express" value="express" label="Express" />
      </RadioGroup>,
    )

    const expressRadio = screen.getByRole('radio', { name: 'Express' })
    expect(expressRadio).toHaveAttribute('id', 'speed-express')

    await user.click(screen.getByText('Express'))
    expect(expressRadio).toBeChecked()
  })

  it('moves the selection with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<DeliverySpeedGroup defaultValue="standard" />)

    await user.tab()
    expect(screen.getByRole('radio', { name: 'Standard' })).toHaveFocus()

    await pressAndRelease(user, 'ArrowDown')

    const expressRadio = screen.getByRole('radio', { name: 'Express' })
    await waitFor(() => expect(expressRadio).toHaveFocus())
    expect(expressRadio).toBeChecked()

    await pressAndRelease(user, 'ArrowUp')

    const standardRadio = screen.getByRole('radio', { name: 'Standard' })
    await waitFor(() => expect(standardRadio).toHaveFocus())
    expect(standardRadio).toBeChecked()
    expect(expressRadio).not.toBeChecked()
  })

  it('reports the newly selected value to onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DeliverySpeedGroup onValueChange={onValueChange} />)

    await user.click(screen.getByText('Overnight'))

    expect(onValueChange).toHaveBeenCalledWith('overnight')
  })

  it('starts from defaultValue when it is uncontrolled', () => {
    render(<DeliverySpeedGroup defaultValue="express" />)

    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked()
  })

  it('stays put when a controlled parent ignores the change', async () => {
    const user = userEvent.setup()
    render(<DeliverySpeedGroup value="standard" />)

    await user.click(screen.getByText('Express'))

    expect(screen.getByRole('radio', { name: 'Standard' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Express' })).not.toBeChecked()
  })

  it('announces the orientation it was given', () => {
    render(
      <DeliverySpeedGroup orientation={RadioGroupOrientation.Horizontal} />,
    )

    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    )
  })

  it('marks the group invalid and describes it with the error message', () => {
    render(<DeliverySpeedGroup error="Pick a delivery speed" />)

    const group = screen.getByRole('radiogroup', { name: 'Delivery speed' })

    expect(screen.getByText('Pick a delivery speed')).toBeInTheDocument()
    expect(group).toHaveAttribute('aria-invalid', 'true')
    expect(group).toHaveAccessibleDescription('Pick a delivery speed')
  })

  it('leaves the group valid and undescribed when there is no error', () => {
    render(<DeliverySpeedGroup />)

    const group = screen.getByRole('radiogroup', { name: 'Delivery speed' })

    expect(group).not.toHaveAttribute('aria-invalid')
    expect(group).toHaveAccessibleDescription('')
  })

  it('keeps a caller description alongside the error message', () => {
    render(
      <>
        <span id="speed-hint">Overnight costs extra</span>
        <DeliverySpeedGroup
          aria-describedby="speed-hint"
          error="Pick a delivery speed"
        />
      </>,
    )

    expect(
      screen.getByRole('radiogroup', { name: 'Delivery speed' }),
    ).toHaveAccessibleDescription('Overnight costs extra Pick a delivery speed')
  })

  it('removes the error message once the error clears', async () => {
    const { rerender } = render(
      <DeliverySpeedGroup error="Pick a delivery speed" />,
    )

    rerender(<DeliverySpeedGroup />)

    await waitFor(() => {
      expect(
        screen.queryByText('Pick a delivery speed'),
      ).not.toBeInTheDocument()
    })
    expect(
      screen.getByRole('radiogroup', { name: 'Delivery speed' }),
    ).not.toHaveAttribute('aria-invalid')
  })

  it('keeps the selected value while showing an error', () => {
    render(
      <DeliverySpeedGroup
        defaultValue="express"
        error="Overnight only today"
      />,
    )

    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked()
  })

  it('does not select a per-item disabled option when its label is clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup label="Delivery speed" onValueChange={onValueChange}>
        <RadioGroupItem value="standard" label="Standard" />
        <RadioGroupItem value="overnight" label="Overnight" disabled />
      </RadioGroup>,
    )

    const overnightRadio = screen.getByRole('radio', { name: 'Overnight' })
    expect(overnightRadio).toBeDisabled()

    await user.click(screen.getByText('Overnight'))

    expect(overnightRadio).not.toBeChecked()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('does not select any option when the whole group is disabled', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DeliverySpeedGroup disabled onValueChange={onValueChange} />)

    const expressRadio = screen.getByRole('radio', { name: 'Express' })
    expect(expressRadio).toBeDisabled()

    await user.click(screen.getByText('Express'))

    expect(expressRadio).not.toBeChecked()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('submits the selected value with the surrounding form', async () => {
    const user = userEvent.setup()
    let submittedSpeed: FormDataEntryValue | null = null
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      submittedSpeed = new FormData(event.currentTarget).get('speed')
    }

    render(
      <form onSubmit={onSubmit}>
        <DeliverySpeedGroup name="speed" />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByText('Express'))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(submittedSpeed).toBe('express')
  })

  it('renders an unlabelled group named by aria-label', () => {
    render(
      <RadioGroup aria-label="Delivery speed">
        <RadioGroupItem value="standard" label="Standard" />
      </RadioGroup>,
    )

    expect(
      screen.getByRole('radiogroup', { name: 'Delivery speed' }),
    ).toBeInTheDocument()
  })

  it('lets an app drive the selection from its own state', async () => {
    const user = userEvent.setup()
    render(<ControlledDeliverySpeed />)

    await user.click(screen.getByText('Overnight'))

    expect(screen.getByRole('radio', { name: 'Overnight' })).toBeChecked()
    expect(screen.getByText('Chosen: overnight')).toBeInTheDocument()
  })
})
