import { createContext } from 'react'

import type { RadioGroupSharedState } from './types'

export const RadioGroupSharedStateContext =
  createContext<RadioGroupSharedState>({
    error: false,
    disabled: false,
  })
