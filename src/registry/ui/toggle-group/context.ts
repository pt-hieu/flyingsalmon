import { createContext } from 'react'

import { type ToggleGroupSharedState, ToggleGroupSize } from './types'

export const ToggleGroupSharedStateContext =
  createContext<ToggleGroupSharedState>({
    size: ToggleGroupSize.Default,
    pressedValues: [],
    isAtMax: false,
  })
