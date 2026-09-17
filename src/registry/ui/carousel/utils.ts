import type { CarouselScrollerBox } from './types'

export function inDocumentOrder(elements: HTMLElement[]): HTMLElement[] {
  return elements.toSorted((first, second) =>
    first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1,
  )
}

export function withoutElement(
  elements: HTMLElement[],
  removed: HTMLElement,
): HTMLElement[] {
  return elements.filter((element) => element !== removed)
}

export function itemStarts(itemElements: HTMLElement[]): number[] {
  return itemElements.map((itemElement) => itemElement.offsetLeft)
}

export function nearestItemIndex(starts: number[], scrollLeft: number): number {
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  starts.forEach((start, index) => {
    const distance = Math.abs(start - scrollLeft)

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
    }
  })

  return nearestIndex
}

export function visibleItemIndexes(
  itemElements: HTMLElement[],
  visibleElements: Set<HTMLElement>,
): number[] {
  return itemElements.flatMap((itemElement, index) =>
    visibleElements.has(itemElement) ? [index] : [],
  )
}

export function clampIndex(index: number, count: number): number {
  return Math.min(Math.max(index, 0), count - 1)
}

const subPixelScrollTolerance = 1

export function hasNextPage(scrollerBox: CarouselScrollerBox): boolean {
  const remaining =
    scrollerBox.scrollWidth - (scrollerBox.scrollLeft + scrollerBox.clientWidth)

  return remaining > subPixelScrollTolerance
}

export function scrollToItem(
  scrollerElement: HTMLElement,
  itemElements: HTMLElement[],
  index: number,
): number | null {
  const itemElement = itemElements[clampIndex(index, itemElements.length)]

  if (!itemElement) return null

  scrollerElement.scrollTo({ left: itemElement.offsetLeft, behavior: 'smooth' })

  return itemElement.offsetLeft
}

export function scrollByPages(
  scrollerElement: HTMLElement,
  from: number,
  pages: number,
): number {
  const left = from + pages * scrollerElement.clientWidth

  scrollerElement.scrollTo({ left, behavior: 'smooth' })

  return left
}
