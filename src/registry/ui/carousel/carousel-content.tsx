import { useRef } from 'react'

import { cn } from '@/lib/utils'

import { carouselScrollByKey } from './carousel-scroll-by-key'
import { carouselContentClassName } from './classnames'
import type { CarouselScrollTravel } from './types'
import { useCarouselSharedState } from './use-carousel'
import { withinScrollTravel } from './utils'

export function CarouselContent({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<'div'>) {
  const { scrollerRef, itemElements } = useCarouselSharedState()

  /**
   * A key pressed while a smooth scroll is still running has to step on from
   * where that scroll is heading, not from where the scroller has reached, or a
   * second press lands on the item the first one already picked. The commanded
   * travel stands while the scroller sits somewhere along it; a scroll the user
   * drove elsewhere leaves it, and the live position takes over again.
   */
  const commandedTravelRef = useRef<CarouselScrollTravel | null>(null)

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

        const commandedTravel = commandedTravelRef.current
        const { scrollLeft } = event.currentTarget

        const from =
          commandedTravel &&
          withinScrollTravel({ scrollLeft, travel: commandedTravel })
            ? commandedTravel.to
            : scrollLeft

        const to = scroll({
          scrollerElement: event.currentTarget,
          itemElements,
          from,
        })

        if (to !== null) {
          commandedTravelRef.current = { from, to }
        }
      }}
      {...props}
    />
  )
}
