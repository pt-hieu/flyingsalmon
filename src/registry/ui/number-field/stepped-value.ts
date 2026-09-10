import { committedNumber } from './committed-number'

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
