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
        scroll({
          scrollerElement: event.currentTarget,
          itemElements,
          current,
        })
      }}
      {...props}
    />
  )
}
