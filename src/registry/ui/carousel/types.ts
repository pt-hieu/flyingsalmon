export interface CarouselScrollerBox {
  scrollLeft: number
  clientWidth: number
  scrollWidth: number
}

export interface CarouselScrollState extends CarouselScrollerBox {
  current: number
}

export interface CarouselScrollTravel {
  from: number
  to: number
}

export interface CarouselKeyboardScroll {
  scrollerElement: HTMLElement
  itemElements: HTMLElement[]
  from: number
}

export interface CarouselState {
  current: number
  count: number
  visible: number[]
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollTo: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
}

export interface CarouselSharedState extends CarouselState {
  scrollerRef: React.RefObject<HTMLDivElement | null>
  itemElements: HTMLElement[]
  registerItem: (itemElement: HTMLElement) => () => void
}
