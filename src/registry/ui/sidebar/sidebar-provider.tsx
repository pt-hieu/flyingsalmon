import { LayoutGroup } from 'motion/react'
import { useId, useState, useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

import { TooltipProvider } from '../tooltip'

import { sidebarShellClassName } from './classnames'
import { SidebarContext } from './context'
import { sidebarWideViewportQuery } from './sidebar-strip-threshold'
import { SidebarLayout } from './types'

function subscribeToWideViewport(onChange: () => void) {
  const query = window.matchMedia(sidebarWideViewportQuery)
  query.addEventListener('change', onChange)

  return () => query.removeEventListener('change', onChange)
}

function readWideViewport() {
  return window.matchMedia(sidebarWideViewportQuery).matches
}

/**
 * The server has no viewport, so the layout is unknown until hydration and the
 * sidebar leaves its width to CSS in the meantime.
 */
function readWideViewportOnServer() {
  return null
}

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

  const [uncontrolledCollapsed, setUncontrolledCollapsed] =
    useState(defaultCollapsed)

  const wideViewport = useSyncExternalStore(
    subscribeToWideViewport,
    readWideViewport,
    readWideViewportOnServer,
  )

  const collapsed = collapsedProp ?? uncontrolledCollapsed

  const setCollapsed = (nextCollapsed: boolean) => {
    if (collapsedProp === undefined) {
      setUncontrolledCollapsed(nextCollapsed)
    }

    onCollapsedChange?.(nextCollapsed)
  }

  const measured = wideViewport !== null

  const wideLayout = collapsed
    ? SidebarLayout.Collapsed
    : SidebarLayout.Expanded

  const layout = wideViewport === false ? SidebarLayout.Strip : wideLayout

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, layout, sidebarId, measured }}
    >
      <TooltipProvider>
        <LayoutGroup id={layoutGroupId}>
          <div className={cn(sidebarShellClassName, className)} {...props}>
            {children}
          </div>
        </LayoutGroup>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}
