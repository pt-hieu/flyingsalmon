import { useContext } from 'react'

import { SidebarContext } from './context'
import type { SidebarSharedState, SidebarState } from './types'

export function useSidebarSharedState(): SidebarSharedState {
  const sharedState = useContext(SidebarContext)

  if (!sharedState) {
    throw new Error('Sidebar state is only available inside <SidebarProvider>')
  }

  return sharedState
}

export function useSidebar(): SidebarState {
  const { collapsed, setCollapsed, layout } = useSidebarSharedState()

  return { collapsed, setCollapsed, layout }
}
