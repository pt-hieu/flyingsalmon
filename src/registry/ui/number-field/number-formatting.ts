import { NumberFormatter, NumberParser } from '@internationalized/number'

const fallbackLocale = 'en-US'

export function resolveLocale(locale?: string): string {
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

export function fractionDigitsForStep(step: number): number {
  const [, fractionDigits] = String(step).split('.')

  return fractionDigits ? fractionDigits.length : 0
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

export function roundToFractionDigits(
  value: number,
  fractionDigits: number,
): number {
  const scale = 10 ** fractionDigits

  return Math.round(value * scale) / scale
}

export function clampToBounds(
  value: number,
  min: number | undefined,
  max: number | undefined,
): number {
  const aboveMin = min === undefined ? value : Math.max(value, min)

  return max === undefined ? aboveMin : Math.min(aboveMin, max)
}

export function steppedValue(
  current: number | null,
  delta: number,
  min: number | undefined,
  max: number | undefined,
  fractionDigits: number,
): number {
  if (current === null) {
    return clampToBounds(delta > 0 ? (min ?? 0) : (max ?? 0), min, max)
  }

  return clampToBounds(
    roundToFractionDigits(current + delta, fractionDigits),
    min,
    max,
  )
}

export function valueTextWithAffixes(
  formattedValue: string,
  prefix: string | undefined,
  unit: string | undefined,
): string {
  const prefixed = prefix ? `${prefix}${formattedValue}` : formattedValue

  return unit ? `${prefixed} ${unit}` : prefixed
}
