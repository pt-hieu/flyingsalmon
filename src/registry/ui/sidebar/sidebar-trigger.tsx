import { cn } from '@/lib/utils'

import { Button, ButtonSize, ButtonVariant } from '../button'

import { sidebarTriggerClassName } from './classnames'

import { SidebarLayout } from './types'
import { useSidebarSharedState } from './use-sidebar'

export interface SidebarTriggerProps extends Omit<
  React.ComponentProps<typeof Button>,
  'variant' | 'size' | 'loading' | 'icon' | 'children'
> {
  children: React.ReactNode
}

function collapseLabel(collapsed: boolean) {
  return collapsed ? 'Expand sidebar' : 'Collapse sidebar'
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const {
    collapsed,
    setCollapsed,
    layout,
    sidebarId,
    menuId,
    menuOpen,
    setMenuOpen,
  } = useSidebarSharedState()

  const opensMenu = layout === SidebarLayout.Strip
  const openMenuId = menuOpen ? menuId : undefined

  return (
    <Button
      variant={ButtonVariant.Outline}
      size={ButtonSize.Icon}
      aria-haspopup={opensMenu ? 'dialog' : undefined}
      aria-expanded={opensMenu ? menuOpen : !collapsed}
      aria-controls={opensMenu ? openMenuId : sidebarId}
      aria-label={opensMenu ? 'Open navigation' : collapseLabel(collapsed)}
      onClick={(event) => {
        if (opensMenu) {
          setMenuOpen(true)
        } else {
          setCollapsed(!collapsed)
        }

        onClick?.(event)
      }}
      data-slot="sidebar-trigger"
      className={cn(sidebarTriggerClassName, className)}
      {...props}
    />
  )
}
