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

export function nearestItemIndex(
  itemStarts: number[],
  scrollLeft: number,
): number {
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  itemStarts.forEach((itemStart, index) => {
    const distance = Math.abs(itemStart - scrollLeft)

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

export function hasNextPage(scrollerBox: {
  scrollLeft: number
  clientWidth: number
  scrollWidth: number
}): boolean {
  const remaining =
    scrollerBox.scrollWidth - (scrollerBox.scrollLeft + scrollerBox.clientWidth)

  return remaining > subPixelScrollTolerance
}

export function scrollToItem(
  scrollerElement: HTMLElement,
  itemElements: HTMLElement[],
  index: number,
) {
  const itemElement = itemElements[clampIndex(index, itemElements.length)]

  if (!itemElement) return

  scrollerElement.scrollTo({ left: itemElement.offsetLeft, behavior: 'smooth' })
}

export function scrollByPages(scrollerElement: HTMLElement, pages: number) {
  scrollerElement.scrollTo({
    left: scrollerElement.scrollLeft + pages * scrollerElement.clientWidth,
    behavior: 'smooth',
  })
}
