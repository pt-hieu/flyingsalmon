import { useRef } from 'react'

import { cn } from '@/lib/utils'

import { carouselScrollByKey } from './carousel-scroll-by-key'
import { carouselContentClassName } from './classnames'
import { useCarouselSharedState } from './use-carousel'

export function CarouselContent({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<'div'>) {
  const { scrollerRef, itemElements, current } = useCarouselSharedState()

  /**
   * A key pressed while a smooth scroll is still running has to step on from
   * where that scroll is heading, not from where the carousel last came to
   * rest, or a second press lands on the item the first one already picked.
   * The target is remembered against the rest position it was commanded from,
   * so it is spent as soon as the carousel settles anywhere new.
   */
  const commandedScrollRef = useRef<{ settledAt: number; left: number } | null>(
    null,
  )

  return (
    <div
      ref={scrollerRef}
      data-slot="carousel-content"
      tabIndex={0}
      className={cn(carouselContentClassName, className)}
      onKeyDown={(event) => {
        onKeyDown?.(event)

        if (event.defaultPrevented || event.target !== event.currentTarget) {
          return
        }

        const scroll = carouselScrollByKey[event.key]

        if (!scroll) return

        event.preventDefault()

        const commanded = commandedScrollRef.current

        const left = scroll({
          scrollerElement: event.currentTarget,
          itemElements,
          from:
            commanded?.settledAt === current
              ? commanded.left
              : event.currentTarget.scrollLeft,
        })

        if (left !== null) {
          commandedScrollRef.current = { settledAt: current, left }
        }
      }}
      {...props}
    />
  )
}
