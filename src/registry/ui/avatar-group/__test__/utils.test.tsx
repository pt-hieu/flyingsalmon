import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { resolveRoster } from '@/registry/ui/avatar-group/resolve-roster'
import {
  childIndexContaining,
  resolveItemName,
  stepFocusWithin,
  tabStopChildIndex,
} from '@/registry/ui/avatar-group/utils'

const crew = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Katherine Johnson' },
  { name: 'Alan Turing' },
  { name: 'Barbara Liskov' },
]

function buildRow() {
  const row = document.createElement('div')
  const avatar = document.createElement('span')
  const chip = document.createElement('span')
  const chipButton = document.createElement('button')

  chip.append(chipButton)
  row.append(avatar, chip)

  return { row, avatar, chipButton }
}

function TravellerRow() {
  return (
    <div role="group" aria-label="Travellers" onKeyDown={stepFocusWithin}>
      <span tabIndex={0}>Ada</span>
      <span>Divider</span>
      <span tabIndex={-1}>Grace</span>
      <button type="button" tabIndex={-1}>
        +3
      </button>
    </div>
  )
}

describe('resolveItemName', () => {
  it.each([
    [
      'the name when there is one',
      { name: 'Ada Lovelace', alt: 'Trip owner' },
      'Ada Lovelace',
    ],
    ['the alt when there is no name', { alt: 'Trip owner' }, 'Trip owner'],
    [
      'the alt when the name is empty',
      { name: '', alt: 'Trip owner' },
      'Trip owner',
    ],
    ['an empty string when there is neither', { src: '/ada.png' }, ''],
  ])('resolves to %s', (_description, item, expectedName) => {
    expect(resolveItemName(item)).toBe(expectedName)
  })
})

describe('childIndexContaining', () => {
  it('finds the child that holds a nested node', () => {
    const { row, chipButton } = buildRow()

    expect(childIndexContaining(row, chipButton)).toBe(1)
  })

  it('counts a child as holding itself', () => {
    const { row, avatar } = buildRow()

    expect(childIndexContaining(row, avatar)).toBe(0)
  })

  it('finds no child when there is no node', () => {
    const { row } = buildRow()

    expect(childIndexContaining(row, null)).toBeNull()
  })

  it('finds no child for a node outside the parent', () => {
    const { row } = buildRow()

    expect(childIndexContaining(row, document.createElement('span'))).toBeNull()
  })

  it('finds no child for the parent itself', () => {
    const { row } = buildRow()

    expect(childIndexContaining(row, row)).toBeNull()
  })
})

describe('tabStopChildIndex', () => {
  it('opens the group on the first avatar before focus has been anywhere', () => {
    const roster = resolveRoster({ items: crew, max: 4 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: null })).toBe(0)
  })

  it('keeps the tab stop on the avatar focus last reached', () => {
    const roster = resolveRoster({ items: crew, max: 4 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 2 })).toBe(2)
  })

  it('keeps the tab stop on the chip, one past the last avatar', () => {
    const roster = resolveRoster({ items: crew, max: 2 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 2 })).toBe(2)
  })

  it('opens on the first named avatar when earlier ones are nameless', () => {
    const roster = resolveRoster({
      items: [{ src: '/anonymous.png' }, { name: 'Ada Lovelace' }],
      max: 4,
    })

    expect(tabStopChildIndex({ roster, focusedChildIndex: null })).toBe(1)
  })

  it('refuses the tab stop to a nameless avatar and falls back to the first', () => {
    const roster = resolveRoster({
      items: [
        { name: 'Ada Lovelace' },
        { src: '/anonymous.png' },
        { name: 'Grace Hopper' },
      ],
      max: 4,
    })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 1 })).toBe(0)
  })

  it('falls back to the first avatar when the remembered child is gone', () => {
    const roster = resolveRoster({ items: crew, max: 5 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 9 })).toBe(0)
  })

  it('offers no tab stop when nobody in the group can be named', () => {
    const roster = resolveRoster({ items: [{ src: '/anonymous.png' }], max: 4 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: null })).toBeNull()
  })
})

describe('stepFocusWithin', () => {
  it('moves focus to the next focusable child on ArrowRight, skipping children without a tabindex', async () => {
    const user = userEvent.setup()
    render(<TravellerRow />)
    screen.getByText('Ada').focus()

    await user.keyboard('{ArrowRight}')

    expect(screen.getByText('Grace')).toHaveFocus()
  })

  it('moves focus to the previous focusable child on ArrowLeft', async () => {
    const user = userEvent.setup()
    render(<TravellerRow />)
    screen.getByRole('button', { name: '+3' }).focus()

    await user.keyboard('{ArrowLeft}')

    expect(screen.getByText('Grace')).toHaveFocus()
  })

  it('jumps to the first and last focusable child on Home and End', async () => {
    const user = userEvent.setup()
    render(<TravellerRow />)
    screen.getByText('Grace').focus()

    await user.keyboard('{End}')
    expect(screen.getByRole('button', { name: '+3' })).toHaveFocus()

    await user.keyboard('{Home}')
    expect(screen.getByText('Ada')).toHaveFocus()
  })

  it('keeps focus on the last child when ArrowRight has nowhere to go', async () => {
    const user = userEvent.setup()
    render(<TravellerRow />)
    screen.getByRole('button', { name: '+3' }).focus()

    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('button', { name: '+3' })).toHaveFocus()
  })

  it('claims the stepping keys so the page does not scroll', () => {
    render(<TravellerRow />)
    const ada = screen.getByText('Ada')
    ada.focus()

    const notPrevented = fireEvent.keyDown(ada, { key: 'End' })

    expect(notPrevented).toBe(false)
  })

  it('leaves other keys to the browser', () => {
    render(<TravellerRow />)
    const ada = screen.getByText('Ada')
    ada.focus()

    const notPrevented = fireEvent.keyDown(ada, { key: 'Enter' })

    expect(notPrevented).toBe(true)
    expect(ada).toHaveFocus()
  })
})
