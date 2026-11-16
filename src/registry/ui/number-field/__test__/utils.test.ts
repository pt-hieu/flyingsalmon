import { describe, expect, it } from 'vitest'

import { inputModeForRange } from '@/registry/ui/number-field/utils'

describe('inputModeForRange', () => {
  it.each([
    ['there is no min', undefined, 0],
    ['min is negative', -5, 2],
  ])(
    'asks for the full keyboard when %s, since numeric keypads have no minus sign',
    (_description, min, fractionDigits) => {
      expect(inputModeForRange(min, fractionDigits)).toBe('text')
    },
  )

  it('asks for a numeric keypad for whole non-negative numbers', () => {
    expect(inputModeForRange(0, 0)).toBe('numeric')
  })

  it('asks for a decimal keypad for fractional non-negative numbers', () => {
    expect(inputModeForRange(0, 2)).toBe('decimal')
  })
})
