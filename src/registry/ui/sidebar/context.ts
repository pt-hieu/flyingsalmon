import { createContext } from 'react'

import type { SidebarSharedState, SidebarNestState } from './types'

export const SidebarContext = createContext<SidebarSharedState | null>(null)

export const SidebarNestContext = createContext<SidebarNestState | null>(null)

export const SidebarNestItemsContext = createContext(false)
