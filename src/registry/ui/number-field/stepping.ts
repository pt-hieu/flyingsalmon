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
