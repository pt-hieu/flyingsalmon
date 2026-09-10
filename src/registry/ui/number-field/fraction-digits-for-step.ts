export function fractionDigitsForStep(step: number): number {
  const [, fractionDigits] = String(step).split('.')

  return fractionDigits ? fractionDigits.length : 0
}
