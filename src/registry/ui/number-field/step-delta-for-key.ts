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
