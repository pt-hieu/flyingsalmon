import { createContext } from 'react'

import type { ComboboxSharedState } from './types'

export const ComboboxSharedStateContext =
  createContext<ComboboxSharedState | null>(null)
