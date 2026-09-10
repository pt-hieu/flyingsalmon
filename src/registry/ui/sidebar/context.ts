import { createContext } from 'react'

import type { SidebarSharedState } from './types'

export const SidebarContext = createContext<SidebarSharedState | null>(null)
