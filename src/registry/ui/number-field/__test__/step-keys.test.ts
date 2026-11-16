import { describe, expect, it } from 'vitest'

import {
  boundForKey,
  stepDeltaForKey,
} from '@/registry/ui/number-field/step-keys'

describe('stepDeltaForKey', () => {
  it.each([
    ['ArrowUp', false, 1],
    ['ArrowUp', true, 10],
    ['ArrowDown', false, -1],
    ['ArrowDown', true, -10],
    ['PageUp', false, 10],
    ['PageUp', true, 10],
    ['PageDown', false, -10],
  ])('steps %s with shift %s by %d', (key, shiftKey, expectedDelta) => {
    expect(stepDeltaForKey(key, shiftKey, 1, 10)).toBe(expectedDelta)
  })

  it('does not step on other keys', () => {
    expect(stepDeltaForKey('Enter', false, 1, 10)).toBeNull()
  })
})

describe('boundForKey', () => {
  it('jumps to min on Home and max on End', () => {
    expect(boundForKey('Home', 0, 10)).toBe(0)
    expect(boundForKey('End', 0, 10)).toBe(10)
  })

  it('does not jump when the matching bound is missing', () => {
    expect(boundForKey('Home', undefined, 10)).toBeNull()
    expect(boundForKey('End', 0, undefined)).toBeNull()
  })

  it('does not jump on other keys', () => {
    expect(boundForKey('PageUp', 0, 10)).toBeNull()
  })
})
