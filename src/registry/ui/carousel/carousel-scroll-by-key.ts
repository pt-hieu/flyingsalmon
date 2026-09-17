import { scrollByPages, scrollToItem } from './utils'

export interface CarouselKeyboardScroll {
  scrollerElement: HTMLElement
  itemElements: HTMLElement[]
  current: number
}

export const carouselScrollByKey: Record<
  string,
  (scroll: CarouselKeyboardScroll) => void
> = {
  ArrowRight: ({ scrollerElement, itemElements, current }) =>
    scrollToItem(scrollerElement, itemElements, current + 1),
  ArrowLeft: ({ scrollerElement, itemElements, current }) =>
    scrollToItem(scrollerElement, itemElements, current - 1),
  Home: ({ scrollerElement, itemElements }) =>
    scrollToItem(scrollerElement, itemElements, 0),
  End: ({ scrollerElement, itemElements }) =>
    scrollToItem(scrollerElement, itemElements, itemElements.length - 1),
  PageDown: ({ scrollerElement }) => scrollByPages(scrollerElement, 1),
  PageUp: ({ scrollerElement }) => scrollByPages(scrollerElement, -1),
}
