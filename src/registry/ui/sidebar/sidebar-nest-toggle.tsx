import { ChevronRight } from 'lucide-react'

import {
  sidebarNestChevronClassName,
  sidebarNestToggleClassName,
} from './classnames'
import type { SidebarNestState } from './types'

export interface SidebarNestToggleProps {
  nest: SidebarNestState
  label: React.ReactNode
}

export function SidebarNestToggle({ nest, label }: SidebarNestToggleProps) {
  return (
    <button
      type="button"
      data-slot="sidebar-nest-toggle"
      aria-expanded={nest.open}
      aria-controls={nest.itemsId}
      aria-label={typeof label === 'string' ? `${label} items` : 'Nested items'}
      className={sidebarNestToggleClassName}
      onClick={() => nest.setOpen(!nest.open)}
    >
      <ChevronRight className={sidebarNestChevronClassName} />
    </button>
  )
}
