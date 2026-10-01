export function stepPercents(min: number, max: number, step: number) {
  const range = max - min
  const stepCount = Math.floor(Number((range / step).toFixed(9)))

  return Array.from(
    { length: stepCount + 1 },
    (_unused, stepIndex) => ((stepIndex * step) / range) * 100,
  )
}

export function valuePercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

export function thumbCentreOffset(percent: number) {
  return `calc(${percent}% + var(--slider-thumb-width) * (50 - ${percent}) / 100)`
}
