import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  boundForKey,
  committedNumber,
  formatNumber,
  fractionDigitsForStep,
  inputModeForRange,
  parseNumber,
  resolveLocale,
  stepDeltaForKey,
  steppedValue,
  valueTextWithAffixes,
} from '@/registry/ui/number-field/utils'

describe('resolveLocale', () => {
  afterEach(() => {
    document.documentElement.lang = ''
    vi.restoreAllMocks()
  })

  it('uses the locale the caller gives', () => {
    document.documentElement.lang = 'de-DE'

    expect(resolveLocale('vi-VN')).toBe('vi-VN')
  })

  it('falls back to the document language', () => {
    document.documentElement.lang = 'de-DE'

    expect(resolveLocale(undefined)).toBe('de-DE')
  })

  it('falls back to the browser language when the document has none', () => {
    vi.spyOn(Navigator.prototype, 'language', 'get').mockReturnValue('fr-FR')

    expect(resolveLocale(undefined)).toBe('fr-FR')
  })

  it('falls back to en-US when neither the document nor the browser has a language', () => {
    vi.spyOn(Navigator.prototype, 'language', 'get').mockReturnValue('')

    expect(resolveLocale(undefined)).toBe('en-US')
  })
})

describe('formatNumber', () => {
  it.each([
    ['rounds to the allowed fraction digits', 1.239, 'en-US', 2, '1.24'],
    ['adds no trailing zeros to a whole number', 3, 'en-US', 2, '3'],
  ])('%s', (_description, value, locale, fractionDigits, expectedText) => {
    expect(formatNumber(value, locale, fractionDigits)).toBe(expectedText)
  })
})

describe('parseNumber', () => {
  it.each([['abc'], ['']])('reads %j as no number', (text) => {
    expect(parseNumber(text, 'en-US')).toBeNull()
  })
})

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

describe('valueTextWithAffixes', () => {
  it.each([
    ['no affixes', undefined, undefined, '12'],
    ['a prefix', '$', undefined, '$12'],
    ['a unit', undefined, 'nights', '12 nights'],
    ['a prefix and a unit', '$', 'per night', '$12 per night'],
  ])('reads the value with %s', (_description, prefix, unit, expectedText) => {
    expect(valueTextWithAffixes('12', prefix, unit)).toBe(expectedText)
  })
})
