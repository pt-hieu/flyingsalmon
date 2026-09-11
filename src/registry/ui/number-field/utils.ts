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

export function fractionDigitsForStep(step: number): number {
  const [, fractionDigits] = String(step).split('.')

  return fractionDigits ? fractionDigits.length : 0
}

export function committedNumber(
  value: number,
  min: number | undefined,
  max: number | undefined,
  fractionDigits: number,
): number {
  const scale = 10 ** fractionDigits
  const rounded = Math.round(value * scale) / scale

  const aboveMin = min === undefined ? rounded : Math.max(rounded, min)

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
    return committedNumber(
      delta > 0 ? (min ?? 0) : (max ?? 0),
      min,
      max,
      fractionDigits,
    )
  }

  return committedNumber(current + delta, min, max, fractionDigits)
}

export function stepDeltaForKey(
  key: string,
  shiftKey: boolean,
  step: number,
  largeStep: number,
): number | null {
  if (key === 'ArrowUp') {
    return shiftKey ? largeStep : step
  }

  if (key === 'ArrowDown') {
    return shiftKey ? -largeStep : -step
  }

  if (key === 'PageUp') {
    return largeStep
  }

  if (key === 'PageDown') {
    return -largeStep
  }

  return null
}

export function boundForKey(
  key: string,
  min: number | undefined,
  max: number | undefined,
): number | null {
  if (key === 'Home' && min !== undefined) {
    return min
  }

  if (key === 'End' && max !== undefined) {
    return max
  }

  return null
}

export function inputModeForRange(
  min: number | undefined,
  fractionDigits: number,
): React.ComponentProps<'input'>['inputMode'] {
  if (min === undefined || min < 0) {
    return 'text'
  }

  return fractionDigits > 0 ? 'decimal' : 'numeric'
}

export function valueTextWithAffixes(
  formattedValue: string,
  prefix: string | undefined,
  unit: string | undefined,
): string {
  const prefixed = prefix ? `${prefix}${formattedValue}` : formattedValue

  return unit ? `${prefixed} ${unit}` : prefixed
}
