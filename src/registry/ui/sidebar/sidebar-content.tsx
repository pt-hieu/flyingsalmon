import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import { Dialog, DialogSurface, DialogTitle } from '../dialog'

import {
  sidebarContentClassName,
  sidebarInlineContentClassName,
  sidebarMenuClassName,
  sidebarMenuTitleClassName,
} from './classnames'
import { SidebarLayout } from './types'
import { useSidebarSharedState } from './use-sidebar'

export type SidebarContentProps = React.ComponentProps<'div'>

function scrollFullyIntoView(container: HTMLElement, item: Element) {
  const containerBounds = container.getBoundingClientRect()
  const itemBounds = item.getBoundingClientRect()

  if (itemBounds.top < containerBounds.top) {
    container.scrollTop -= containerBounds.top - itemBounds.top
  } else if (itemBounds.bottom > containerBounds.bottom) {
    container.scrollTop += itemBounds.bottom - containerBounds.bottom
  }

  if (itemBounds.left < containerBounds.left) {
    container.scrollLeft -= containerBounds.left - itemBounds.left
  } else if (itemBounds.right > containerBounds.right) {
    container.scrollLeft += itemBounds.right - containerBounds.right
  }
}

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
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogSurface
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
          <DialogTitle className={sidebarMenuTitleClassName}>
            Navigation
          </DialogTitle>
          <div
            ref={containerRef}
            data-slot="sidebar-content"
            className={cn(sidebarContentClassName, className)}
            {...props}
          />
        </DialogSurface>
      </Dialog>
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
