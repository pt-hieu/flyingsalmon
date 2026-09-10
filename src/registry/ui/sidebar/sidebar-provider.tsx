import { LayoutGroup } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/registry/ui/tooltip'

import { sidebarProviderClassName, sidebarShellClassName } from './classnames'
import { SidebarContext } from './context'
import { sidebarStripThreshold } from './sidebar-strip-threshold'
import { SidebarLayout } from './types'

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
  const containerRef = useRef<HTMLDivElement>(null)

  const [uncontrolledCollapsed, setUncontrolledCollapsed] =
    useState(defaultCollapsed)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const collapsed = collapsedProp ?? uncontrolledCollapsed

  const setCollapsed = (nextCollapsed: boolean) => {
    if (collapsedProp === undefined) {
      setUncontrolledCollapsed(nextCollapsed)
    }

    onCollapsedChange?.(nextCollapsed)
  }

  const measured = containerWidth !== null

  const belowStripThreshold =
    containerWidth !== null && containerWidth < sidebarStripThreshold

  const wideLayout = collapsed ? SidebarLayout.Rail : SidebarLayout.Expanded

  const layout = belowStripThreshold ? SidebarLayout.Strip : wideLayout

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, layout, sidebarId, measured }}
    >
      <TooltipProvider>
        <LayoutGroup id={layoutGroupId}>
          <div
            ref={containerRef}
            className={cn(sidebarProviderClassName, className)}
            {...props}
          >
            <div className={sidebarShellClassName}>{children}</div>
          </div>
        </LayoutGroup>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}
