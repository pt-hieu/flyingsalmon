import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupMode,
  type ToggleGroupMultipleProps,
  type ToggleGroupSingleProps,
} from '@/registry/ui/toggle-group'

type SingleGroupOverrides = Omit<Partial<ToggleGroupSingleProps>, 'mode'>

type MultipleGroupOverrides = Omit<Partial<ToggleGroupMultipleProps>, 'mode'>

function ActivityTypeGroup(props: SingleGroupOverrides = {}) {
  return (
    <ToggleGroup label="Activity type" {...props}>
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museum">Museum</ToggleGroupItem>
      <ToggleGroupItem value="hike">Hike</ToggleGroupItem>
    </ToggleGroup>
  )
}

function InterestsGroup(props: MultipleGroupOverrides = {}) {
  return (
    <ToggleGroup label="Interests" mode={ToggleGroupMode.Multiple} {...props}>
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museum">Museum</ToggleGroupItem>
      <ToggleGroupItem value="hike">Hike</ToggleGroupItem>
      <ToggleGroupItem value="nightlife">Nightlife</ToggleGroupItem>
    </ToggleGroup>
  )
}

function ActivityTypeWithDisabledMuseum(props: SingleGroupOverrides = {}) {
  return (
    <ToggleGroup label="Activity type" defaultValue="food" {...props}>
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museum" disabled>
        Museum
      </ToggleGroupItem>
      <ToggleGroupItem value="hike">Hike</ToggleGroupItem>
    </ToggleGroup>
  )
}

function ControlledActivityType() {
  const [selectedType, setSelectedType] = useState('food')

  return (
    <>
      <ActivityTypeGroup value={selectedType} onValueChange={setSelectedType} />
      <p>Chosen: {selectedType || 'nothing'}</p>
    </>
  )
}

describe('ToggleGroup', () => {
  it('reports the pressed value in single mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ActivityTypeGroup onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: 'Museum' }))

    expect(onValueChange).toHaveBeenCalledWith('museum')
    expect(screen.getByRole('radio', { name: 'Museum' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Food' })).not.toBeChecked()
  })

  it('deselects back to empty in single mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ActivityTypeGroup defaultValue="museum" onValueChange={onValueChange} />,
    )

    await user.click(screen.getByRole('radio', { name: 'Museum' }))

    expect(onValueChange).toHaveBeenCalledWith('')
    expect(screen.getByRole('radio', { name: 'Museum' })).not.toBeChecked()
  })

  it('reports an array of pressed values in multiple mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<InterestsGroup onValueChange={onValueChange} />)

    await user.click(screen.getByRole('button', { name: 'Food' }))
    await user.click(screen.getByRole('button', { name: 'Hike' }))

    expect(onValueChange).toHaveBeenNthCalledWith(1, ['food'])
    expect(onValueChange).toHaveBeenNthCalledWith(2, ['food', 'hike'])
    expect(screen.getByRole('button', { name: 'Food' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('exposes a radiogroup in single mode and a group in multiple mode', () => {
    render(
      <>
        <ActivityTypeGroup />
        <InterestsGroup />
      </>,
    )

    expect(
      screen.getByRole('radiogroup', { name: 'Activity type' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Interests' })).toBeInTheDocument()
  })

  it('refuses a new pick once max is reached and still lets a pressed chip go', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <InterestsGroup
        max={2}
        defaultValue={['food', 'hike']}
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Museum' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Museum' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    await user.click(screen.getByRole('button', { name: 'Hike' }))

    expect(onValueChange).toHaveBeenCalledWith(['food'])
    expect(screen.getByRole('button', { name: 'Museum' })).toBeEnabled()
  })

  it('blocks the last deselect when required in single mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ActivityTypeGroup
        required
        defaultValue="museum"
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByRole('radio', { name: 'Museum' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radio', { name: 'Museum' })).toBeChecked()

    await user.click(screen.getByRole('radio', { name: 'Hike' }))

    expect(onValueChange).toHaveBeenCalledWith('hike')
  })

  it('blocks the last deselect when required in multiple mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <InterestsGroup
        required
        defaultValue={['food']}
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Food' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Food' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('marks a required single-mode group aria-required', () => {
    render(<ActivityTypeGroup required />)

    expect(
      screen.getByRole('radiogroup', { name: 'Activity type' }),
    ).toHaveAttribute('aria-required', 'true')
  })

  it('leaves an optional group without aria-required', () => {
    render(<ActivityTypeGroup />)

    expect(
      screen.getByRole('radiogroup', { name: 'Activity type' }),
    ).not.toHaveAttribute('aria-required')
  })

  it('keeps the required marker out of the accessible name', () => {
    render(<ActivityTypeGroup required />)

    expect(
      screen.getByRole('radiogroup', { name: 'Activity type' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Activity type')).toHaveTextContent(
      /^Activity type$/,
    )
  })

  it('takes one tab stop that lands on the pressed chip', async () => {
    const user = userEvent.setup()
    render(<ActivityTypeGroup defaultValue="hike" />)

    await user.tab()

    expect(screen.getByRole('radio', { name: 'Hike' })).toHaveFocus()

    await user.tab()

    expect(screen.getByRole('radio', { name: 'Hike' })).not.toHaveFocus()
  })

  it('wraps around the ends with the left and right arrows', async () => {
    const user = userEvent.setup()
    render(<ActivityTypeGroup defaultValue="hike" />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'Food' })).toHaveFocus(),
    )

    await user.keyboard('{ArrowLeft}')

    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'Hike' })).toHaveFocus(),
    )
  })

  it('reaches the ends with Home and End', async () => {
    const user = userEvent.setup()
    render(<ActivityTypeGroup defaultValue="museum" />)

    await user.tab()
    await user.keyboard('{End}')

    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'Hike' })).toHaveFocus(),
    )

    await user.keyboard('{Home}')

    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'Food' })).toHaveFocus(),
    )
  })

  it('leaves focus alone on the up and down arrows', async () => {
    const user = userEvent.setup()
    render(<ActivityTypeGroup defaultValue="museum" />)

    await user.tab()
    await user.keyboard('{ArrowDown}')

    expect(screen.getByRole('radio', { name: 'Museum' })).toHaveFocus()

    await user.keyboard('{ArrowUp}')

    expect(screen.getByRole('radio', { name: 'Museum' })).toHaveFocus()
  })

  it('toggles the focused chip with Space and with Enter', async () => {
    const user = userEvent.setup()
    render(<InterestsGroup />)

    await user.tab()
    await user.keyboard(' ')

    expect(screen.getByRole('button', { name: 'Food' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: 'Food' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('renders the error message and links it to the group', () => {
    render(<ActivityTypeGroup error="Pick an activity type" />)

    const group = screen.getByRole('radiogroup', { name: 'Activity type' })

    expect(screen.getByText('Pick an activity type')).toBeInTheDocument()
    expect(group).toHaveAttribute('aria-invalid', 'true')
    expect(group).toHaveAccessibleDescription('Pick an activity type')
  })

  it('leaves the group valid and undescribed with no error', () => {
    render(<ActivityTypeGroup />)

    const group = screen.getByRole('radiogroup', { name: 'Activity type' })

    expect(group).not.toHaveAttribute('aria-invalid')
    expect(group).toHaveAccessibleDescription('')
  })

  it('posts one hidden value in single mode and none when empty', async () => {
    const user = userEvent.setup()
    let submittedTypes: FormDataEntryValue[] = []
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      submittedTypes = new FormData(event.currentTarget).getAll('activityType')
    }

    render(
      <form onSubmit={onSubmit}>
        <ActivityTypeGroup name="activityType" />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(submittedTypes).toEqual([])

    await user.click(screen.getByRole('radio', { name: 'Museum' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(submittedTypes).toEqual(['museum'])
  })

  it('posts one hidden value per pressed chip in multiple mode', async () => {
    const user = userEvent.setup()
    let submittedInterests: FormDataEntryValue[] = []
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      submittedInterests = new FormData(event.currentTarget).getAll('interests')
    }

    render(
      <form onSubmit={onSubmit}>
        <InterestsGroup name="interests" />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Food' }))
    await user.click(screen.getByRole('button', { name: 'Hike' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(submittedInterests).toEqual(['food', 'hike'])
  })

  it('posts nothing while the group is disabled', async () => {
    const user = userEvent.setup()
    let submittedTypes: FormDataEntryValue[] = []
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      submittedTypes = new FormData(event.currentTarget).getAll('activityType')
    }

    render(
      <form onSubmit={onSubmit}>
        <ActivityTypeGroup name="activityType" defaultValue="museum" disabled />
        <button type="submit">Save</button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(submittedTypes).toEqual([])
  })

  it('renders a required group that was mounted empty', () => {
    render(<ActivityTypeGroup required />)

    expect(screen.getByRole('radio', { name: 'Food' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Museum' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Hike' })).not.toBeChecked()
  })

  it('renders an item icon without adding it to the accessible name', () => {
    render(
      <ToggleGroup label="Activity type">
        <ToggleGroupItem value="food" icon={<svg data-testid="food-icon" />}>
          Food
        </ToggleGroupItem>
      </ToggleGroup>,
    )

    expect(screen.getByTestId('food-icon')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Food' })).toBeInTheDocument()
  })

  it('does not toggle a disabled item', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ActivityTypeWithDisabledMuseum onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: 'Museum' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radio', { name: 'Museum' })).not.toBeChecked()
  })

  it('leaves a disabled item out of the arrow order', async () => {
    const user = userEvent.setup()
    render(<ActivityTypeWithDisabledMuseum />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'Hike' })).toHaveFocus(),
    )
  })

  it('does not toggle anything when the whole group is disabled', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ActivityTypeGroup disabled onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: 'Museum' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radio', { name: 'Museum' })).not.toBeChecked()
  })

  it('lets an app drive the selection from its own state', async () => {
    const user = userEvent.setup()
    render(<ControlledActivityType />)

    await user.click(screen.getByRole('radio', { name: 'Hike' }))

    expect(screen.getByRole('radio', { name: 'Hike' })).toBeChecked()
    expect(screen.getByText('Chosen: hike')).toBeInTheDocument()
  })

  it('stays put when a controlled parent ignores the change', async () => {
    const user = userEvent.setup()
    render(<ActivityTypeGroup value="food" />)

    await user.click(screen.getByRole('radio', { name: 'Hike' }))

    expect(screen.getByRole('radio', { name: 'Food' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Hike' })).not.toBeChecked()
  })

  it('names an unlabelled group by aria-label', () => {
    render(
      <ToggleGroup aria-label="Activity type">
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
      </ToggleGroup>,
    )

    expect(
      screen.getByRole('radiogroup', { name: 'Activity type' }),
    ).toBeInTheDocument()
  })
})
