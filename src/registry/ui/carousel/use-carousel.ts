import { useContext } from 'react'

import { CarouselContext } from './context'
import type { CarouselSharedState, CarouselState } from './types'

export function useCarouselSharedState(): CarouselSharedState {
  const sharedState = useContext(CarouselContext)

  if (!sharedState) {
    throw new Error('Carousel state is only available inside <Carousel>')
  }

  return sharedState
}

export function useCarousel(): CarouselState {
  const {
    current,
    count,
    visible,
    canScrollPrev,
    canScrollNext,
    scrollTo,
    scrollPrev,
    scrollNext,
  } = useCarouselSharedState()

  return {
    current,
    count,
    visible,
    canScrollPrev,
    canScrollNext,
    scrollTo,
    scrollPrev,
    scrollNext,
  }
}
