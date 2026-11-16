import { isValidElement } from 'react'

import type { SlottedItemProps } from './types'

export function collapseLabel(collapsed: boolean) {
  return collapsed ? 'Expand sidebar' : 'Collapse sidebar'
}

export function slottedItem(children: React.ReactNode) {
  if (!isValidElement<SlottedItemProps>(children)) {
    throw new Error('SidebarItem with asChild takes a single element child')
  }

  return children
}
