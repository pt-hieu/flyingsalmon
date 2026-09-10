export function inputModeForRange(
  min: number | undefined,
  fractionDigits: number,
): 'text' | 'decimal' | 'numeric' {
  if (min === undefined || min < 0) {
    return 'text'
  }

  return fractionDigits > 0 ? 'decimal' : 'numeric'
}
