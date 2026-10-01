import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { sidebarNestClassName } from './classnames'
import { SidebarNestContext, SidebarNestItemsContext } from './context'

export interface SidebarNestProps extends React.ComponentProps<'div'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarNest({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: SidebarNestProps) {
  const itemsId = useId()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [activeChildCount, setActiveChildCount] = useState(0)
  const onOpenChangeRef = useRef(onOpenChange)

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange
  })

  const open = openProp ?? uncontrolledOpen

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
    <SidebarNestContext value={state}>
      <SidebarNestItemsContext value={false}>
        <div
          data-slot="sidebar-nest"
          data-state={open ? 'open' : 'closed'}
          className={cn(sidebarNestClassName, className)}
          {...props}
        />
      </SidebarNestItemsContext>
    </SidebarNestContext>
  )
}
