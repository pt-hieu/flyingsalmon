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
