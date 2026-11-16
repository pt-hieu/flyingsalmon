import { NumberFormatter, NumberParser } from '@internationalized/number'

const fallbackLocale = 'en-US'

export function resolveLocale(locale: string | undefined): string {
  if (locale) {
    return locale
  }

  if (typeof document !== 'undefined' && document.documentElement.lang) {
    return document.documentElement.lang
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language
  }

  return fallbackLocale
}

export function formatNumber(
  value: number,
  locale: string,
  fractionDigits: number,
): string {
  return new NumberFormatter(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

export function parseNumber(text: string, locale: string): number | null {
  const parsed = new NumberParser(locale).parse(text)

  return Number.isNaN(parsed) ? null : parsed
}

export const unparseableNumber = Symbol('unparseable number')

export function typedNumber(
  text: string,
  locale: string,
): number | null | typeof unparseableNumber {
  const trimmedText = text.trim()

  if (trimmedText === '') {
    return null
  }

  return parseNumber(trimmedText, locale) ?? unparseableNumber
}

export function valueTextWithAffixes(
  formattedValue: string,
  prefix: string | undefined,
  unit: string | undefined,
): string {
  const prefixed = prefix ? `${prefix}${formattedValue}` : formattedValue

  return unit ? `${prefixed} ${unit}` : prefixed
}
