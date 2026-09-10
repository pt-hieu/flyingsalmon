import { NumberFormatter } from '@internationalized/number'

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
