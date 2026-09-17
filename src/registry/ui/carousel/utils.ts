import type { CarouselScrollerBox, CarouselScrollTravel } from './types'

function follows(element: HTMLElement, reference: HTMLElement): boolean {
  return Boolean(
    reference.compareDocumentPosition(element) &
    Node.DOCUMENT_POSITION_FOLLOWING,
  )
}

function insertedInDocumentOrder(
  ordered: HTMLElement[],
  inserted: HTMLElement,
): HTMLElement[] {
  const followingIndex = ordered.findIndex((element) =>
    follows(element, inserted),
  )

  if (followingIndex === -1) {
    return [...ordered, inserted]
  }

  return [
    ...ordered.slice(0, followingIndex),
    inserted,
    ...ordered.slice(followingIndex),
  ]
}

export function inDocumentOrder(elements: HTMLElement[]): HTMLElement[] {
  return elements.reduce<HTMLElement[]>(insertedInDocumentOrder, [])
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

export function withinScrollTravel({
  scrollLeft,
  travel,
}: {
  scrollLeft: number
  travel: CarouselScrollTravel
}): boolean {
  const start = Math.min(travel.from, travel.to) - subPixelScrollTolerance
  const end = Math.max(travel.from, travel.to) + subPixelScrollTolerance

  return scrollLeft >= start && scrollLeft <= end
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
