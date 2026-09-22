import { ChevronRight } from 'lucide-react'

import {
  sidebarSubmenuChevronClassName,
  sidebarSubmenuToggleClassName,
} from './classnames'
import type { SidebarSubmenuState } from './types'

export interface SidebarSubmenuToggleProps {
  submenu: SidebarSubmenuState
  label: React.ReactNode
}

export function SidebarSubmenuToggle({
  submenu,
  label,
}: SidebarSubmenuToggleProps) {
  return (
    <button
      type="button"
      data-slot="sidebar-submenu-toggle"
      aria-expanded={submenu.open}
      aria-controls={submenu.itemsId}
      aria-label={typeof label === 'string' ? `${label} submenu` : 'Submenu'}
      className={sidebarSubmenuToggleClassName}
      onClick={() => submenu.setOpen(!submenu.open)}
    >
      <ChevronRight className={sidebarSubmenuChevronClassName} />
    </button>
  )
}
