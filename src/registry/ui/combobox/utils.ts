export function toSelectedValues(value: string | string[] | null): string[] {
  if (value === null) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}
