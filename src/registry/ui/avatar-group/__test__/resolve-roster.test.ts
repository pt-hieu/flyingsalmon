import { describe, expect, it } from 'vitest'

import { resolveRoster } from '@/registry/ui/avatar-group/resolve-roster'

const crew = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Katherine Johnson' },
  { name: 'Alan Turing' },
  { name: 'Barbara Liskov' },
]

describe('resolveRoster', () => {
  it('shows every person and asks for no chip when the roster fits max', () => {
    const roster = resolveRoster({ items: crew, max: 5 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.name)).toEqual([
      'Ada Lovelace',
      'Grace Hopper',
      'Katherine Johnson',
      'Alan Turing',
      'Barbara Liskov',
    ])
    expect(roster.chip).toBeNull()
  })

  it('splits the roster at max and counts everyone past it into the chip', () => {
    const roster = resolveRoster({ items: crew, max: 2 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.name)).toEqual([
      'Ada Lovelace',
      'Grace Hopper',
    ])
    expect(roster.chip?.count).toBe(3)
    expect(roster.chip?.text).toBe('+3')
  })

  it('clamps a max below one back up to a single person', () => {
    const roster = resolveRoster({ items: crew, max: 0 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.name)).toEqual([
      'Ada Lovelace',
    ])
    expect(roster.chip?.count).toBe(4)
  })

  it('caps the chip text while the count keeps the true total', () => {
    const crowd = Array.from({ length: 254 }, (_unused, index) => ({
      id: `person-${index}`,
      name: `Person ${index}`,
    }))

    const roster = resolveRoster({ items: crowd, max: 4, cap: 99 })

    expect(roster.chip?.count).toBe(250)
    expect(roster.chip?.text).toBe('+99')
  })

  it('leaves the chip text uncapped when the true count is under cap', () => {
    const roster = resolveRoster({ items: crew, max: 4, cap: 99 })

    expect(roster.chip?.text).toBe('+1')
  })

  it('joins the hidden names in roster order', () => {
    const roster = resolveRoster({ items: crew, max: 2 })

    expect(roster.chip?.hiddenNames).toBe(
      'Katherine Johnson, Alan Turing, Barbara Liskov',
    )
  })

  it('leaves a nameless hidden person out of the joined names', () => {
    const roster = resolveRoster({
      items: [
        { name: 'Ada Lovelace' },
        { src: '/anonymous.png' },
        { name: 'Grace Hopper' },
      ],
      max: 1,
    })

    expect(roster.chip?.count).toBe(2)
    expect(roster.chip?.hiddenNames).toBe('Grace Hopper')
  })

  it('falls back to alt for a person carrying no name', () => {
    const roster = resolveRoster({
      items: [{ src: '/ada.png', alt: 'Trip owner' }],
      max: 4,
    })

    expect(roster.visibleItems[0].name).toBe('Trip owner')
  })

  it('resolves an empty roster to nothing to render', () => {
    const roster = resolveRoster({ items: [], max: 4 })

    expect(roster.visibleItems).toEqual([])
    expect(roster.chip).toBeNull()
  })
})
