import { ChevronLeft } from 'lucide-react'

import {
  Button,
  type ButtonProps,
  ButtonSize,
  ButtonVariant,
} from '@/registry/ui/button'

import { useCarouselSharedState } from './use-carousel'

export type CarouselPreviousProps = Omit<ButtonProps, 'variant' | 'size'>

export function CarouselPrevious({
  'aria-label': ariaLabel = 'Previous',
  children,
  ...props
}: CarouselPreviousProps) {
  const { canScrollPrev, scrollPrev } = useCarouselSharedState()

  return (
    <Button
      data-slot="carousel-previous"
      variant={ButtonVariant.Ghost}
      size={ButtonSize.IconSmall}
      aria-label={ariaLabel}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {children ?? <ChevronLeft aria-hidden="true" />}
    </Button>
  )
}
