import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import { Drawer, DrawerContent, DrawerTitle } from '../drawer'

import {
  sidebarContentClassName,
  sidebarInlineContentClassName,
  sidebarMenuClassName,
  sidebarMenuTitleClassName,
} from './classnames'
import { scrollFullyIntoView } from './scroll-fully-into-view'
import { SidebarLayout } from './types'
import { useSidebarSharedState } from './use-sidebar'

export type SidebarContentProps = React.ComponentProps<'div'>

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  const { layout, menuId, menuOpen, setMenuOpen } = useSidebarSharedState()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrolledItemRef = useRef<Element | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const activeItem = container?.querySelector('[aria-current="page"]')

    if (!container || !activeItem || activeItem === scrolledItemRef.current) {
      return
    }

    scrolledItemRef.current = activeItem
    scrollFullyIntoView(container, activeItem)
  })

  if (layout === SidebarLayout.Strip) {
    return (
      <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
        <DrawerContent
          id={menuId}
          data-collapsed={false}
          aria-describedby={undefined}
          className={sidebarMenuClassName}
          onClick={(event) => {
            if (
              event.target instanceof Element &&
              event.target.closest('[data-slot="sidebar-item"]')
            ) {
              setMenuOpen(false)
            }
          }}
        >
          <DrawerTitle className={sidebarMenuTitleClassName}>
            Navigation
          </DrawerTitle>
          <div
            ref={containerRef}
            data-slot="sidebar-content"
            className={cn(sidebarContentClassName, className)}
            {...props}
          />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div
      ref={containerRef}
      data-slot="sidebar-content"
      className={cn(
        sidebarContentClassName,
        sidebarInlineContentClassName,
        className,
      )}
      {...props}
    />
  )
}
