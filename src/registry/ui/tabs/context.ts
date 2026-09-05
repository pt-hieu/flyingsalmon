import { createContext } from 'react'

import type { TabsSharedState } from './types'

export const TabsSharedStateContext = createContext<TabsSharedState | null>(
  null,
)
