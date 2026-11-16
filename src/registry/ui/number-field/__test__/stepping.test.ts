import { describe, expect, it } from 'vitest'

import {
  committedNumber,
  fractionDigitsForStep,
  steppedValue,
} from '@/registry/ui/number-field/stepping'

describe('fractionDigitsForStep', () => {
  it.each([
    [1, 0],
    [10, 0],
    [0.5, 1],
    [0.25, 2],
  ])(
    'allows a step of %d to show %i fraction digits',
    (step, fractionDigits) => {
      expect(fractionDigitsForStep(step)).toBe(fractionDigits)
    },
  )
})

describe('committedNumber', () => {
  it('rounds to the allowed fraction digits', () => {
    // oxlint-disable-next-line sonarjs/no-floating-point-equality -- rounding must land on exactly 2.35
    expect(committedNumber(2.346, undefined, undefined, 2)).toBe(2.35)
    expect(committedNumber(7.4, undefined, undefined, 0)).toBe(7)
  })

  it('clamps to min and max', () => {
    expect(committedNumber(-3, 0, 10, 0)).toBe(0)
    expect(committedNumber(12, 0, 10, 0)).toBe(10)
  })

  it('leaves a number alone when there are no bounds', () => {
    expect(committedNumber(-1200, undefined, undefined, 0)).toBe(-1200)
  })
})

describe('steppedValue', () => {
  it('adds the step to the current value', () => {
    expect(steppedValue(4, 1, 0, 10, 0)).toBe(5)
  })

  it('stops at the bound', () => {
    expect(steppedValue(10, 1, 0, 10, 0)).toBe(10)
  })

  it('steps without floating-point drift', () => {
    // oxlint-disable-next-line sonarjs/no-floating-point-equality -- a drifted 0.30000000000000004 must fail
    expect(steppedValue(0.1, 0.2, undefined, undefined, 1)).toBe(0.3)
  })

  it('starts an empty field at min when stepping up', () => {
    expect(steppedValue(null, 1, 3, 10, 0)).toBe(3)
  })

  it('starts an empty field at max when stepping down', () => {
    expect(steppedValue(null, -1, 0, 10, 0)).toBe(10)
  })

  it('starts an empty field at zero when there are no bounds', () => {
    expect(steppedValue(null, 1, undefined, undefined, 0)).toBe(0)
  })
})
