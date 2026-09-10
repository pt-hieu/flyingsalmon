import { createContext } from 'react'

import { TimelineOrientation } from './types'

export const TimelineOrientationContext = createContext(
  TimelineOrientation.Vertical,
)

export const TimelineIsLastItemContext = createContext(true)
