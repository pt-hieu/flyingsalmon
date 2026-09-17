import { type StepperSegment, StepperSegmentState } from './types'

export function stepperSegments({
  count,
  current,
}: {
  count: number
  current: number
}): StepperSegment[] {
  const currentSegment = Math.round(Math.min(Math.max(current, 1), count))

  return Array.from({ length: count }, (_unused, index) => {
    const segmentNumber = index + 1

    if (segmentNumber < currentSegment) {
      return { segmentNumber, state: StepperSegmentState.Complete }
    }

    if (segmentNumber === currentSegment) {
      return { segmentNumber, state: StepperSegmentState.Current }
    }

    return { segmentNumber, state: StepperSegmentState.Upcoming }
  })
}
