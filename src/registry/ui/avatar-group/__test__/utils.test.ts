import { describe, expect, it } from 'vitest'

import {
  childIndexContaining,
  resolveItemName,
} from '@/registry/ui/avatar-group/utils'

function buildRow() {
  const row = document.createElement('div')
  const avatar = document.createElement('span')
  const chip = document.createElement('span')
  const chipButton = document.createElement('button')

  chip.append(chipButton)
  row.append(avatar, chip)

  return { row, avatar, chipButton }
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
