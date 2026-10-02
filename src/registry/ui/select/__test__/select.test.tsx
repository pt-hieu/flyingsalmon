import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Select, SelectItem } from '@/registry/ui/select'

function FruitSelect(props: Partial<React.ComponentProps<typeof Select>>) {
  return (
    <Select label="Fruit" placeholder="Choose a fruit" {...props}>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </Select>
  )
}

describe('Select', () => {
  it('focuses the trigger when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<FruitSelect />)

    await user.click(screen.getByText('Fruit'))

    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveFocus()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it.each([
    ['Enter', '{Enter}'],
    ['Space', ' '],
    ['ArrowUp', '{ArrowUp}'],
    ['ArrowDown', '{ArrowDown}'],
  ])(
    'opens the panel when %s is pressed on the trigger',
    async (_name, key) => {
      const user = userEvent.setup()
      render(<FruitSelect />)

      await user.tab()
      await user.keyboard(key)

      expect(await screen.findByRole('listbox')).toBeInTheDocument()
    },
  )

  it('never changes the value when an arrow key opens a closed trigger', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<FruitSelect onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}')

    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('chooses an item on typeahead and Enter, closes the panel, and fires onValueChange', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<FruitSelect onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}')
    await screen.findByRole('listbox')

    await user.keyboard('banana')
    await user.keyboard('{Enter}')

    expect(onValueChange).toHaveBeenCalledWith('banana')
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent(
      'Banana',
    )
  })

  it('closes on Escape with no change', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<FruitSelect onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}')
    await screen.findByRole('listbox')

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('marks the field invalid and describes it with the error message', () => {
    render(<FruitSelect error="Pick a fruit to continue" />)

    const trigger = screen.getByRole('combobox', { name: 'Fruit' })

    expect(trigger).toHaveAttribute('aria-invalid', 'true')
    expect(trigger).toHaveAccessibleDescription('Pick a fruit to continue')
  })

  it('describes the trigger with its description', () => {
    render(<FruitSelect description="Picked fresh each morning" />)

    expect(
      screen.getByRole('combobox', { name: 'Fruit' }),
    ).toHaveAccessibleDescription('Picked fresh each morning')
  })

  it('describes the trigger with the error message, then the description', () => {
    render(
      <FruitSelect
        description="Picked fresh each morning"
        error="Pick a fruit to continue"
      />,
    )

    expect(
      screen.getByRole('combobox', { name: 'Fruit' }),
    ).toHaveAccessibleDescription(
      'Pick a fruit to continue Picked fresh each morning',
    )
  })

  it('keeps the trigger focusable and busy while loading, and opening is a no-op', async () => {
    const user = userEvent.setup()
    render(<FruitSelect loading />)

    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger).toHaveAttribute('aria-busy', 'true')
    expect(trigger).toBeEnabled()

    await user.tab()
    expect(trigger).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('blocks opening while disabled', async () => {
    const user = userEvent.setup()
    render(<FruitSelect disabled />)

    const trigger = screen.getByRole('combobox', { name: 'Fruit' })
    expect(trigger).toBeDisabled()

    await user.click(trigger)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('posts its value through a native form', () => {
    render(
      <form>
        <FruitSelect name="fruit" defaultValue="cherry" />
      </form>,
    )

    const hiddenSelect = document.querySelector(
      'select[name="fruit"]',
    ) as HTMLSelectElement

    expect(hiddenSelect).not.toBeNull()
    expect(new FormData(hiddenSelect.closest('form')!).get('fruit')).toBe(
      'cherry',
    )
  })

  it('fails native required validation with no value chosen', () => {
    render(
      <form>
        <FruitSelect name="fruit" required />
      </form>,
    )

    const hiddenSelect = document.querySelector('select[name="fruit"]')

    expect(hiddenSelect).toBeInvalid()
  })

  it('exposes a required trigger as required', () => {
    render(<FruitSelect required />)

    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeRequired()
  })

  it('keeps the required marker out of the accessible name', () => {
    render(<FruitSelect required />)

    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument()
    expect(screen.getByText('Fruit')).toHaveTextContent(/^Fruit$/)
  })

  it('marks the checked item as selected and never renders the placeholder as an option', async () => {
    const user = userEvent.setup()
    render(<FruitSelect defaultValue="banana" />)

    await user.tab()
    await user.keyboard('{ArrowDown}')

    const options = await screen.findAllByRole('option')
    expect(options.map((option) => option.textContent)).toEqual([
      'Apple',
      'Banana',
      'Cherry',
    ])
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.queryByText('Choose a fruit')).not.toBeInTheDocument()
  })
  it('renders an item icon ahead of the label and keeps it out of the option name', async () => {
    const user = userEvent.setup()
    render(
      <Select label="Fruit" placeholder="Choose a fruit">
        <SelectItem value="apple" icon={<svg data-testid="apple-icon" />}>
          Apple
        </SelectItem>
      </Select>,
    )

    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))

    const option = await screen.findByRole('option', { name: 'Apple' })

    expect(option.firstElementChild).toContainElement(
      screen.getByTestId('apple-icon'),
    )
    expect(
      screen.getByTestId('apple-icon').closest('[aria-hidden]'),
    ).not.toBeNull()
  })

  it('shows the label alone on the trigger when an item carrying an icon is chosen', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Select
        label="Fruit"
        placeholder="Choose a fruit"
        onValueChange={onValueChange}
      >
        <SelectItem value="apple" icon={<svg data-testid="apple-icon" />}>
          Apple
        </SelectItem>
      </Select>,
    )

    await user.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await user.click(await screen.findByRole('option', { name: 'Apple' }))

    const trigger = screen.getByRole('combobox', { name: 'Fruit' })

    expect(onValueChange).toHaveBeenCalledWith('apple')
    expect(trigger).toHaveTextContent('Apple')
    expect(within(trigger).queryByTestId('apple-icon')).not.toBeInTheDocument()
  })
})
