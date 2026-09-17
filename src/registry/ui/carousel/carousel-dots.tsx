import { cn } from '@/lib/utils'

import { carouselDotsLimit } from './carousel-dots-limit'
import {
  carouselDotClassName,
  carouselDotMarkVariants,
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
        const isCurrent = index === current

        return (
          <button
            key={itemLabel ?? index}
            type="button"
            data-slot="carousel-dot"
            aria-label={itemLabel}
            aria-current={isCurrent || undefined}
            className={carouselDotClassName}
            onClick={() => scrollTo(index)}
          >
            <span className={carouselDotMarkVariants({ current: isCurrent })} />
          </button>
        )
      })}
    </div>
  )
}
