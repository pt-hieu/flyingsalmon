import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

import { carouselDotsLimit } from './carousel-dots-limit'
import {
  carouselCurrentDotMarkClassName,
  carouselDotClassName,
  carouselDotMarkClassName,
  carouselDotsClassName,
} from './classnames'
import { useCarouselSharedState } from './use-carousel'

export function CarouselDots({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { itemElements, count, current, scrollTo } = useCarouselSharedState()

  if (count === 0 || count > carouselDotsLimit) return null

  return (
    <div
      data-slot="carousel-dots"
      role="group"
      className={cn(carouselDotsClassName, className)}
      {...props}
    >
      {itemElements.map((itemElement, index) => {
        const itemLabel = itemElement.getAttribute('aria-label') ?? undefined

        return (
          <button
            key={itemLabel ?? index}
            type="button"
            data-slot="carousel-dot"
            aria-label={itemLabel}
            aria-current={index === current || undefined}
            className={carouselDotClassName}
            onClick={() => scrollTo(index)}
          >
            <span className={carouselDotMarkClassName} />
            {index === current ? (
              <motion.span
                layout
                layoutId="carousel-current-dot"
                transition={springBounce}
                className={carouselCurrentDotMarkClassName}
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
