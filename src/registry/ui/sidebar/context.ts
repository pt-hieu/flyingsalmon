import { createContext } from 'react'

import type { SidebarSharedState, SidebarSubmenuState } from './types'

export const SidebarContext = createContext<SidebarSharedState | null>(null)

export const SidebarSubmenuContext = createContext<SidebarSubmenuState | null>(
  null,
)

export const SidebarSubmenuItemsContext = createContext(false)
