import { cn } from '@/lib/utils'

import {
  boundaryFocusRingGeometry,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

export const carouselClassName = cn(
  '@container flex w-full flex-col gap-3',
  '[--carousel-item:270px] [--carousel-inline-padding:0px]',
)

const alwaysVisibleScrollbar = cn(
  '[scrollbar-width:thin] [scrollbar-color:var(--muted-foreground)_var(--background)]',
  '[&::-webkit-scrollbar]:h-2',
)

export const carouselContentClassName = cn(
  'relative flex w-full snap-x snap-mandatory scroll-smooth overflow-x-scroll',
  'px-(--carousel-inline-padding) scroll-ps-(--carousel-inline-padding)',
  alwaysVisibleScrollbar,
  'ring-ring',
  boundaryFocusRingGeometry,
)

export const carouselItemClassName = 'w-(--carousel-item) shrink-0 snap-start'

export const carouselDotsClassName = 'flex items-center justify-center gap-1'

export const carouselDotClassName = cn(
  'ring-ring group/dot relative flex h-6 min-w-6 cursor-pointer items-center justify-center rounded-full px-1',
  offsetFocusRingGeometry,
)

export const carouselDotMarkClassName = cn(
  'bg-muted-foreground size-2 rounded-full',
  'transition-colors duration-(--motion-fast) group-hover/dot:bg-foreground',
)

export const carouselCurrentDotMarkClassName =
  'bg-indicator absolute inset-0 m-auto h-2 w-5 rounded-full'
