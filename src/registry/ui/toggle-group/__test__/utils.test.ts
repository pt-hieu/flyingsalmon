import { describe, expect, it } from 'vitest'

import { toPressedValues } from '@/registry/ui/toggle-group/utils'

describe('toPressedValues', () => {
  it.each([
    ['no value', undefined],
    ['an empty value', ''],
  ])('presses nothing for %s', (_description, value) => {
    expect(toPressedValues(value)).toEqual([])
  })

  it('presses the single value it is given', () => {
    expect(toPressedValues('bold')).toEqual(['bold'])
  })

  it('presses every value in a list', () => {
    expect(toPressedValues(['bold', 'italic'])).toEqual(['bold', 'italic'])
  })
})
