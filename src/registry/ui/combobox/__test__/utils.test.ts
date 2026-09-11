import { describe, expect, it } from 'vitest'

import { toSelectedValues } from '@/registry/ui/combobox/utils'

describe('toSelectedValues', () => {
  it('has no selected values when nothing is selected', () => {
    expect(toSelectedValues(null)).toEqual([])
  })

  it('wraps a single selected value in a list', () => {
    expect(toSelectedValues('paris')).toEqual(['paris'])
  })

  it('keeps a list of selected values as it is', () => {
    expect(toSelectedValues(['paris', 'rome'])).toEqual(['paris', 'rome'])
  })
})
