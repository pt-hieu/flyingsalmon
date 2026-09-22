import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { sidebarSubmenuClassName } from './classnames'
import { SidebarSubmenuContext, SidebarSubmenuItemsContext } from './context'
import { SidebarLayout } from './types'
import { useSidebarSharedState } from './use-sidebar'

export interface SidebarSubmenuProps extends React.ComponentProps<'div'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarSubmenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: SidebarSubmenuProps) {
  const { layout } = useSidebarSharedState()
  const itemsId = useId()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [activeChildCount, setActiveChildCount] = useState(0)
  const onOpenChangeRef = useRef(onOpenChange)

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange
  })

  const open = layout === SidebarLayout.Strip || (openProp ?? uncontrolledOpen)

  const setOpen = useCallback((next: boolean) => {
    setUncontrolledOpen(next)
    onOpenChangeRef.current?.(next)
  }, [])

  const registerActiveChild = useCallback(() => {
    setActiveChildCount((count) => count + 1)
    setOpen(true)

    return () => setActiveChildCount((count) => count - 1)
  }, [setOpen])

  const state = useMemo(
    () => ({
      open,
      setOpen,
      itemsId,
      hasActiveChild: activeChildCount > 0,
      registerActiveChild,
    }),
    [open, setOpen, itemsId, activeChildCount, registerActiveChild],
  )

  return (
    <SidebarSubmenuContext value={state}>
      <SidebarSubmenuItemsContext value={false}>
        <div
          data-slot="sidebar-submenu"
          data-state={open ? 'open' : 'closed'}
          className={cn(sidebarSubmenuClassName, className)}
          {...props}
        />
      </SidebarSubmenuItemsContext>
    </SidebarSubmenuContext>
  )
}
