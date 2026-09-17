import { describe, expect, it } from 'vitest'

import { StepperSegmentState } from '@/registry/ui/stepper'
import { stepperSegments } from '@/registry/ui/stepper/utils'

function readStates(count: number, current: number) {
  return stepperSegments({ count, current }).map((segment) => segment.state)
}

const { Complete, Current, Upcoming } = StepperSegmentState

describe('stepperSegments', () => {
  it('completes every segment before the current one and leaves the rest upcoming', () => {
    expect(readStates(4, 3)).toEqual([Complete, Complete, Current, Upcoming])
  })

  it('numbers the segments from one up to the count', () => {
    expect(
      stepperSegments({ count: 3, current: 1 }).map(
        (segment) => segment.segmentNumber,
      ),
    ).toEqual([1, 2, 3])
  })

  it('leaves nothing complete on the first segment', () => {
    expect(readStates(3, 1)).toEqual([Current, Upcoming, Upcoming])
  })

  it('leaves nothing upcoming on the last segment', () => {
    expect(readStates(3, 3)).toEqual([Complete, Complete, Current])
  })

  it('clamps a current above the count to the last segment', () => {
    expect(readStates(3, 9)).toEqual([Complete, Complete, Current])
  })

  it.each([
    ['below one', 0],
    ['negative', -4],
  ])('clamps a current %s to the first segment', (_description, current) => {
    expect(readStates(3, current)).toEqual([Current, Upcoming, Upcoming])
  })

  it('rounds a current that lands between two segments up to the later one', () => {
    expect(readStates(4, 2.5)).toEqual([Complete, Complete, Current, Upcoming])
  })

  it('rounds a current nearer the earlier segment back to it', () => {
    expect(readStates(4, 2.4)).toEqual([Complete, Current, Upcoming, Upcoming])
  })

  it('has no segments to report for a count of zero', () => {
    expect(stepperSegments({ count: 0, current: 1 })).toEqual([])
  })
})
