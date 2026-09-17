import type { CarouselKeyboardScroll } from './types'
import {
  itemStarts,
  nearestItemIndex,
  scrollByPages,
  scrollToItem,
} from './utils'

function stepByItems(scroll: CarouselKeyboardScroll, items: number) {
  const startIndex = nearestItemIndex(
    itemStarts(scroll.itemElements),
    scroll.from,
  )

  return scrollToItem(
    scroll.scrollerElement,
    scroll.itemElements,
    startIndex + items,
  )
}

export const carouselScrollByKey: Record<
  string,
  (scroll: CarouselKeyboardScroll) => number | null
> = {
  ArrowRight: (scroll) => stepByItems(scroll, 1),
  ArrowLeft: (scroll) => stepByItems(scroll, -1),
  Home: ({ scrollerElement, itemElements }) =>
    scrollToItem(scrollerElement, itemElements, 0),
  End: ({ scrollerElement, itemElements }) =>
    scrollToItem(scrollerElement, itemElements, itemElements.length - 1),
  PageDown: ({ scrollerElement, from }) =>
    scrollByPages(scrollerElement, from, 1),
  PageUp: ({ scrollerElement, from }) =>
    scrollByPages(scrollerElement, from, -1),
}
