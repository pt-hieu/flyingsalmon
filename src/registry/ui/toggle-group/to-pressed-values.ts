export function toPressedValues(value: string | string[] | undefined) {
  if (value === undefined) return []

  if (Array.isArray(value)) return value

  return value === '' ? [] : [value]
}
