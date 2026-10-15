import { LayoutGroup } from 'motion/react'
import { useCallback, useId, useState, useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'
import { useControllableState } from '@/registry/lib/use-controllable-state'

import { TooltipProvider } from '../tooltip'

import { sidebarShellClassName } from './classnames'
import { SidebarContext } from './context'
import { SidebarLayout } from './types'
import {
  readWideViewport,
  subscribeToWideViewport,
  unknownViewportOnServer,
} from './utils'

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function SidebarProvider({
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const layoutGroupId = useId()
  const sidebarId = useId()
  const menuId = useId()

  const [collapsed, setCollapsed] = useControllableState({
    value: collapsedProp,
    defaultValue: defaultCollapsed,
    onChange: onCollapsedChange,
  })
  const [menuOpen, setMenuOpen] = useState(false)

  const subscribeAndCloseMenu = useCallback((onChange: () => void) => {
    return subscribeToWideViewport(() => {
      setMenuOpen(false)
      onChange()
    })
  }, [])

  const wideViewport = useSyncExternalStore(
    subscribeAndCloseMenu,
    readWideViewport,
    unknownViewportOnServer,
  )

  const measured = wideViewport !== null

  const wideLayout = collapsed
    ? SidebarLayout.Collapsed
    : SidebarLayout.Expanded

  const layout = wideViewport === false ? SidebarLayout.Strip : wideLayout

  return (
    <SidebarContext
      value={{
        collapsed,
        setCollapsed,
        layout,
        sidebarId,
        menuId,
        menuOpen,
        setMenuOpen,
        measured,
      }}
    >
      <TooltipProvider>
        <LayoutGroup id={layoutGroupId}>
          <div className={cn(sidebarShellClassName, className)} {...props}>
            {children}
          </div>
        </LayoutGroup>
      </TooltipProvider>
    </SidebarContext>
  )
}
