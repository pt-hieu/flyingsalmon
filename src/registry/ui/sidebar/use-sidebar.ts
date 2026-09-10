import { useContext } from 'react'

import { SidebarContext } from './context'

export function useSidebar(componentName = 'useSidebar') {
  const sidebarState = useContext(SidebarContext)

  if (!sidebarState) {
    throw new Error(
      `${componentName} must be rendered inside <SidebarProvider>`,
    )
  }

  return sidebarState
}
