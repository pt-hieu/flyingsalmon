import { isValidElement } from 'react'

import { sidebarWideViewportQuery } from './sidebar-strip-threshold'
import type { SidebarNestState, SlottedItemProps } from './types'

export function ownsCurrentMark(
  isActive: boolean,
  nest: SidebarNestState | null,
  isNestChild: boolean,
) {
  if (!nest) return isActive
  if (isNestChild) return isActive && nest.open

  return isActive || (!nest.open && nest.hasActiveChild)
}

export function collapseLabel(collapsed: boolean) {
  return collapsed ? 'Expand sidebar' : 'Collapse sidebar'
}

export function slottedItem(children: React.ReactNode) {
  if (!isValidElement<SlottedItemProps>(children)) {
    throw new Error('SidebarItem with asChild takes a single element child')
  }

  return children
}

export function subscribeToWideViewport(onChange: () => void) {
  const query = window.matchMedia(sidebarWideViewportQuery)
  query.addEventListener('change', onChange)

  return () => query.removeEventListener('change', onChange)
}

export function readWideViewport() {
  return window.matchMedia(sidebarWideViewportQuery).matches
}

export function unknownViewportOnServer() {
  return null
}
