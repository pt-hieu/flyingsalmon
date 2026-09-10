export function valueTextWithAffixes(
  formattedValue: string,
  prefix: string | undefined,
  unit: string | undefined,
): string {
  const prefixed = prefix ? `${prefix}${formattedValue}` : formattedValue

  return unit ? `${prefixed} ${unit}` : prefixed
}
