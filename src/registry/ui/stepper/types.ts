export enum StepperSegmentState {
  Complete = 'complete',
  Current = 'current',
  Upcoming = 'upcoming',
}

export interface StepperSegment {
  segmentNumber: number
  state: StepperSegmentState
}
