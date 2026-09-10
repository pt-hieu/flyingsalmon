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
