import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import {
  boundaryFocusRingGeometry,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

export const carouselClassName = cn(
  '@container flex w-full flex-col gap-3',
  '[--carousel-item:270px] [--carousel-inline-padding:0px]',
)

const hiddenScrollbar = cn(
  '[scrollbar-width:none]',
  '[&::-webkit-scrollbar]:hidden',
)

export const carouselContentClassName = cn(
  'relative flex w-full snap-x snap-mandatory scroll-smooth overflow-x-scroll',
  'px-(--carousel-inline-padding) scroll-ps-(--carousel-inline-padding)',
  hiddenScrollbar,
  'ring-ring',
  boundaryFocusRingGeometry,
)

export const carouselItemClassName = 'w-(--carousel-item) shrink-0 snap-start'

export const carouselDotsClassName = 'flex items-center justify-center gap-1'

export const carouselDotClassName = cn(
  'ring-ring group/dot flex size-6 cursor-pointer items-center justify-center rounded-full',
  offsetFocusRingGeometry,
)

export const carouselDotMarkVariants = cva(
  'size-2 rounded-full transition-colors duration-(--motion-fast)',
  {
    variants: {
      current: {
        true: 'bg-primary',
        false: 'bg-muted-foreground group-hover/dot:bg-foreground',
      },
    },
    defaultVariants: {
      current: false,
    },
  },
)
