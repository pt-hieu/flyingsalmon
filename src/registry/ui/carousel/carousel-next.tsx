import { ChevronRight } from 'lucide-react'

import {
  Button,
  type ButtonProps,
  ButtonSize,
  ButtonVariant,
} from '@/registry/ui/button'

import { useCarouselSharedState } from './use-carousel'

export type CarouselNextProps = Omit<ButtonProps, 'variant' | 'size'>

export function CarouselNext({
  'aria-label': ariaLabel = 'Next',
  children,
  ...props
}: CarouselNextProps) {
  const { canScrollNext, scrollNext } = useCarouselSharedState()

  return (
    <Button
      data-slot="carousel-next"
      variant={ButtonVariant.Ghost}
      size={ButtonSize.IconSmall}
      aria-label={ariaLabel}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {children ?? <ChevronRight aria-hidden="true" />}
    </Button>
  )
}
