import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  Combobox,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxMode,
  type ComboboxProps,
  ComboboxSeparator,
} from '@/registry/ui/combobox'
import { Button } from '@/registry/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'

const CITIES = [
  { value: 'paris', label: 'Paris' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'hanoi', label: 'Hanoi' },
]

type SingleProps = Partial<
  Omit<Extract<ComboboxProps, { mode: ComboboxMode.Single }>, 'mode'>
>

function SingleCityCombobox({
  onValueChange,
  items = CITIES,
  ...props
}: SingleProps & { items?: typeof CITIES }) {
  const [value, setValue] = useState<string | null>(props.value ?? null)

  return (
    <Combobox
      mode={ComboboxMode.Single}
      label="City"
      placeholder="Search a city"
      {...props}
      value={value}
      onValueChange={(nextValue) => {
        setValue(nextValue)
        onValueChange?.(nextValue)
      }}
    >
      {items.map((city) => (
        <ComboboxItem key={city.value} value={city.value}>
          {city.label}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}

type MultipleProps = Partial<
  Omit<Extract<ComboboxProps, { mode: ComboboxMode.Multiple }>, 'mode'>
>

function MultipleCityCombobox({ onValueChange, ...props }: MultipleProps) {
  const [values, setValues] = useState<string[]>(props.value ?? [])

  return (
    <Combobox
      mode={ComboboxMode.Multiple}
      label="Cities"
      placeholder="Search cities"
      {...props}
      value={values}
      onValueChange={(nextValues) => {
        setValues(nextValues)
        onValueChange?.(nextValues)
      }}
    >
      {CITIES.map((city) => (
        <ComboboxItem key={city.value} value={city.value}>
          {city.label}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}

function getInputByLabel(label: string) {
  return screen.getByRole('combobox', { name: label })
}

function getInput() {
  return getInputByLabel('City')
}

async function waitForClosedPanel() {
  await waitFor(() => {
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
}

describe('Combobox', () => {
  it('opens the panel on typing and keeps it closed on focus alone', async () => {
    const user = userEvent.setup()
    render(<SingleCityCombobox />)

    await user.tab()

    expect(getInput()).toHaveFocus()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.keyboard('pa')

    expect(await screen.findByRole('listbox')).toBeInTheDocument()
  })

  it('points aria-activedescendant at the highlighted item, including after the items change', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<SingleCityCombobox />)

    await user.tab()
    await user.keyboard('{ArrowDown}')

    await screen.findByRole('listbox')
    const firstOption = screen.getByRole('option', { name: 'Paris' })

    expect(firstOption).toHaveAttribute('data-highlighted')
    expect(getInput()).toHaveAttribute('aria-activedescendant', firstOption.id)

    rerender(<SingleCityCombobox items={CITIES.slice(1)} />)

    const optionAfterChange = screen.getByRole('option', { name: 'Tokyo' })

    await waitFor(() => {
      expect(optionAfterChange).toHaveAttribute('data-highlighted')
    })
    expect(getInput()).toHaveAttribute(
      'aria-activedescendant',
      optionAfterChange.id,
    )
  })

  it('reports the item key and closes the panel when Enter commits a highlight in single mode', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<SingleCityCombobox onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}')

    expect(onValueChange).toHaveBeenCalledWith('tokyo')
    await waitForClosedPanel()
    expect(getInput()).toHaveValue('Tokyo')
  })

  it('keeps the panel open and marks the item selected when Enter commits a highlight in multiple mode', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<MultipleCityCombobox onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')

    expect(onValueChange).toHaveBeenCalledWith(['paris'])
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Paris' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('closes on Escape and keeps the typed text', async () => {
    const user = userEvent.setup()
    render(<SingleCityCombobox allowFreeText />)

    await user.tab()
    await user.keyboard('par')
    await screen.findByRole('listbox')

    await user.keyboard('{Escape}')

    await waitForClosedPanel()
    expect(getInput()).toHaveValue('par')
  })

  it('closes without selecting when Tab leaves the field', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<SingleCityCombobox onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}')
    await screen.findByRole('listbox')

    await user.tab()

    await waitForClosedPanel()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('reverts unmatched text on blur in strict single mode', async () => {
    const user = userEvent.setup()
    render(<SingleCityCombobox />)

    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')
    expect(getInput()).toHaveValue('Paris')

    await user.clear(getInput())
    await user.keyboard('Reykjavik')
    await user.tab()

    await waitFor(() => {
      expect(getInput()).toHaveValue('Paris')
    })
  })

  it('keeps unmatched text on blur and reports it as the value when free text is allowed', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<SingleCityCombobox allowFreeText onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('Reykjavik')
    await user.tab()

    expect(onValueChange).toHaveBeenCalledWith('Reykjavik')
    expect(getInput()).toHaveValue('Reykjavik')
  })

  it('adds a chip on a pick and removes the last one on Backspace in an empty input', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<MultipleCityCombobox onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')

    expect(onValueChange).toHaveBeenLastCalledWith(['paris'])
    expect(getInputByLabel('Cities')).toHaveValue('')

    await user.keyboard('{Escape}')
    await waitForClosedPanel()

    expect(screen.getByText('Paris')).toBeInTheDocument()

    await user.keyboard('{Backspace}')

    expect(onValueChange).toHaveBeenLastCalledWith([])
    await waitFor(() => {
      expect(screen.queryByText('Paris')).not.toBeInTheDocument()
    })
  })

  it('focuses the last chip on ArrowLeft from the start of the caret', async () => {
    const user = userEvent.setup()
    render(<MultipleCityCombobox />)

    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')
    await user.keyboard('{ArrowDown}{Enter}')
    await user.keyboard('{Escape}')
    await waitForClosedPanel()

    await user.keyboard('{ArrowLeft}')

    await waitFor(() => {
      expect(screen.getByText('Tokyo')).toHaveFocus()
    })
  })

  it('empties the text, the selection, and the chips when clear is pressed', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<MultipleCityCombobox onValueChange={onValueChange} />)

    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')
    await user.keyboard('han')

    await user.click(screen.getByRole('button', { name: 'Clear selection' }))

    expect(onValueChange).toHaveBeenLastCalledWith([])
    await waitFor(() => {
      expect(getInputByLabel('Cities')).toHaveValue('')
    })
    await waitFor(() => {
      expect(
        screen.queryByText('Paris', { selector: 'span' }),
      ).not.toBeInTheDocument()
    })
  })

  it('opens inside a modal dialog with clickable items', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>
          <Button>Plan a trip</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Plan a trip</DialogTitle>
          <SingleCityCombobox onValueChange={onValueChange} />
        </DialogContent>
      </Dialog>,
    )

    await user.click(screen.getByRole('button', { name: 'Plan a trip' }))
    await screen.findByRole('dialog')

    const input = getInput()
    input.focus()
    await user.keyboard('{ArrowDown}')

    await user.click(await screen.findByRole('option', { name: 'Paris' }))

    expect(onValueChange).toHaveBeenCalledWith('paris')
  })

  it('renders ComboboxEmpty when the app passes no items', async () => {
    const user = userEvent.setup()

    render(
      <Combobox
        mode={ComboboxMode.Single}
        label="City"
        placeholder="Search a city"
        value={null}
        onValueChange={() => {}}
      >
        <ComboboxEmpty>No cities match</ComboboxEmpty>
      </Combobox>,
    )

    await user.tab()
    await user.keyboard('zz')

    expect(await screen.findByText('No cities match')).toBeInTheDocument()
    expect(
      within(screen.getByRole('listbox')).queryByText('No cities match'),
    ).not.toBeInTheDocument()
  })

  it('posts the chosen key through a native form', async () => {
    const user = userEvent.setup()

    render(
      <form data-testid="trip-form">
        <SingleCityCombobox name="city" />
      </form>,
    )

    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')

    const form = screen.getByTestId('trip-form') as HTMLFormElement

    await waitFor(() => {
      expect(new FormData(form).get('city')).toBe('paris')
    })
  })

  it('describes the field with its error message and marks it invalid', () => {
    render(<SingleCityCombobox error="Choose a city on the route" />)

    expect(getInput()).toHaveAttribute('aria-invalid', 'true')
    expect(getInput()).toHaveAccessibleDescription('Choose a city on the route')
  })

  it('keeps the panel open and clears the text when a pick arrives with no hover highlight in multiple mode', async () => {
    const user = userEvent.setup()
    render(<MultipleCityCombobox />)

    await user.type(getInputByLabel('Cities'), 'par')

    // A touch tap reaches the item as a bare click: there is no hover to
    // highlight the row first.
    fireEvent.click(await screen.findByRole('option', { name: 'Paris' }))

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(getInputByLabel('Cities')).toHaveValue('')
    expect(
      await screen.findByRole('option', { name: 'Paris', selected: true }),
    ).toBeInTheDocument()
  })

  it('leaves Home to the caret instead of the list highlight', async () => {
    const user = userEvent.setup()
    render(<SingleCityCombobox allowFreeText />)

    await user.type(getInput(), 'paris')
    await screen.findByRole('listbox')
    await user.keyboard('{ArrowDown}{ArrowDown}')

    const highlightedTokyo = await screen.findByRole('option', {
      name: 'Tokyo',
    })

    await waitFor(() => {
      expect(getInput()).toHaveAttribute(
        'aria-activedescendant',
        highlightedTokyo.id,
      )
    })

    await user.keyboard('{Home}')

    expect(getInput()).toHaveAttribute(
      'aria-activedescendant',
      highlightedTokyo.id,
    )
    expect(getInput()).toHaveProperty('selectionStart', 0)
  })

  it('does not commit typed text when Enter arrives with the panel closed', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<MultipleCityCombobox allowFreeText onValueChange={onValueChange} />)

    await user.type(getInputByLabel('Cities'), 'kyoto')
    await user.keyboard('{Escape}')
    await waitForClosedPanel()

    await user.keyboard('{Enter}')

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('reports the typed text unchanged on blur when free text is allowed', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<SingleCityCombobox allowFreeText onValueChange={onValueChange} />)

    await user.type(getInput(), '  kyoto  ')
    await user.tab()

    expect(onValueChange).toHaveBeenCalledWith('  kyoto  ')
  })

  it('renders an item icon ahead of the label and keeps it out of the option name', async () => {
    const user = userEvent.setup()
    render(
      <Combobox
        mode={ComboboxMode.Single}
        label="City"
        placeholder="Search a city"
        value={null}
        onValueChange={vi.fn()}
      >
        <ComboboxItem value="paris" icon={<svg data-testid="paris-icon" />}>
          Paris
        </ComboboxItem>
      </Combobox>,
    )

    await user.type(getInput(), 'par')

    const option = await screen.findByRole('option', { name: 'Paris' })

    expect(option.firstElementChild).toContainElement(
      screen.getByTestId('paris-icon'),
    )
    expect(
      screen.getByTestId('paris-icon').closest('[aria-hidden]'),
    ).not.toBeNull()
  })

  it('reports the label alone when an item carrying an icon is picked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        mode={ComboboxMode.Single}
        label="City"
        placeholder="Search a city"
        value={null}
        onValueChange={onValueChange}
      >
        <ComboboxItem value="paris" icon={<svg data-testid="paris-icon" />}>
          Paris
        </ComboboxItem>
      </Combobox>,
    )

    await user.type(getInput(), 'par')
    await user.click(await screen.findByRole('option', { name: 'Paris' }))

    expect(onValueChange).toHaveBeenCalledWith('paris')
    expect(getInput()).toHaveValue('Paris')
  })

  it('refuses to open when the children hold no item and no empty message', async () => {
    const user = userEvent.setup()
    render(
      <Combobox
        mode={ComboboxMode.Single}
        label="City"
        placeholder="Search a city"
        value={null}
        onValueChange={vi.fn()}
      >
        <ComboboxSeparator />
      </Combobox>,
    )

    await user.type(getInput(), 'par')

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
