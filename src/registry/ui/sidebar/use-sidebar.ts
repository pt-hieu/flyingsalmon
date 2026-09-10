import { useContext } from 'react'

import { SidebarContext } from './context'
import type { SidebarSharedState, SidebarState } from './types'

export function useSidebarSharedState(
  componentName: string,
): SidebarSharedState {
  const sharedState = useContext(SidebarContext)

  if (!sharedState) {
    throw new Error(
      `${componentName} must be rendered inside <SidebarProvider>`,
    )
  }

  return sharedState
}

export function useSidebar(): SidebarState {
  const { collapsed, setCollapsed, layout } =
    useSidebarSharedState('useSidebar')

  return { collapsed, setCollapsed, layout }
}
