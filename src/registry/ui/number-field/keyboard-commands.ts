export function stepDeltaForKey(
  key: string,
  shiftKey: boolean,
  step: number,
  largeStep: number,
): number | null {
  if (key === 'ArrowUp') {
    return shiftKey ? largeStep : step
  }

  if (key === 'ArrowDown') {
    return shiftKey ? -largeStep : -step
  }

  if (key === 'PageUp') {
    return largeStep
  }

  if (key === 'PageDown') {
    return -largeStep
  }

  return null
}

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
