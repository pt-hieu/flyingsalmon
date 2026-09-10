import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import { sidebarContentClassName } from './classnames'

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

  return (
    <div
      ref={containerRef}
      data-slot="sidebar-content"
      className={cn(sidebarContentClassName, className)}
      {...props}
    />
  )
}
