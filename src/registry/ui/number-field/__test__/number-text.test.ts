import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  formatNumber,
  parseNumber,
  resolveLocale,
  typedNumber,
  unparseableNumber,
  valueTextWithAffixes,
} from '@/registry/ui/number-field/number-text'

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

describe('typedNumber', () => {
  it.each([[''], ['   ']])('reads %j as an empty field', (text) => {
    expect(typedNumber(text, 'en-US')).toBeNull()
  })

  it('reads text around surrounding spaces in the locale', () => {
    expect(typedNumber(' 1.500 ', 'de-DE')).toBe(1500)
  })

  it('reads text that is no number as unparseable', () => {
    expect(typedNumber('abc', 'en-US')).toBe(unparseableNumber)
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
