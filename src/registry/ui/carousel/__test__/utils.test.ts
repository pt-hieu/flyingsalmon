import { describe, expect, it } from 'vitest'

import {
  clampIndex,
  hasNextPage,
  inDocumentOrder,
  nearestItemIndex,
  visibleItemIndexes,
  withinScrollTravel,
  withoutElement,
} from '../utils'

function renderDayCards(count: number) {
  const board = document.createElement('div')

  const dayCards = Array.from({ length: count }, () => {
    const dayCard = document.createElement('div')
    board.append(dayCard)

    return dayCard
  })

  return dayCards
}

describe('inDocumentOrder', () => {
  it('puts elements back into the order they appear in the document', () => {
    const [first, second, third] = renderDayCards(3)

    expect(inDocumentOrder([third, first, second])).toEqual([
      first,
      second,
      third,
    ])
  })

  it('leaves the given array untouched', () => {
    const [first, second] = renderDayCards(2)
    const registered = [second, first]

    inDocumentOrder(registered)

    expect(registered).toEqual([second, first])
  })
})

describe('withoutElement', () => {
  it('drops the given element and keeps the rest in order', () => {
    const [first, second, third] = renderDayCards(3)

    expect(withoutElement([first, second, third], second)).toEqual([
      first,
      third,
    ])
  })

  it('leaves the given array untouched', () => {
    const [first, second] = renderDayCards(2)
    const registered = [first, second]

    withoutElement(registered, first)

    expect(registered).toEqual([first, second])
  })
})

describe('nearestItemIndex', () => {
  it('picks the item whose start is closest to the scroll position', () => {
    expect(nearestItemIndex([0, 280, 560], 300)).toBe(1)
  })

  it('picks the earlier item when two starts are equally close', () => {
    expect(nearestItemIndex([0, 280, 560], 420)).toBe(1)
  })

  it('picks the last item when the scroll position runs past every start', () => {
    expect(nearestItemIndex([0, 280, 560], 5000)).toBe(2)
  })

  it('answers with the first index when there are no items', () => {
    expect(nearestItemIndex([], 500)).toBe(0)
  })
})

describe('visibleItemIndexes', () => {
  it('reports the indexes of the given elements in item order', () => {
    const [first, second, third] = renderDayCards(3)

    expect(
      visibleItemIndexes([first, second, third], new Set([third, first])),
    ).toEqual([0, 2])
  })
})

describe('clampIndex', () => {
  it('keeps an index inside the item range', () => {
    expect(clampIndex(5, 3)).toBe(2)
    expect(clampIndex(-2, 3)).toBe(0)
    expect(clampIndex(1, 3)).toBe(1)
  })
})

describe('hasNextPage', () => {
  it('reports a page left while the scroller has not reached its end', () => {
    expect(
      hasNextPage({ scrollLeft: 0, clientWidth: 900, scrollWidth: 1930 }),
    ).toBe(true)
  })

  it('reports no page left at the end of the scroller', () => {
    expect(
      hasNextPage({ scrollLeft: 1030, clientWidth: 900, scrollWidth: 1930 }),
    ).toBe(false)
  })

  it('reports no page left when only a fraction of a pixel remains', () => {
    expect(
      hasNextPage({ scrollLeft: 1029.6, clientWidth: 900, scrollWidth: 1930 }),
    ).toBe(false)
  })
})

describe('withinScrollTravel', () => {
  it('holds a position the scroller passes on its way to the target', () => {
    expect(
      withinScrollTravel({ scrollLeft: 400, travel: { from: 280, to: 840 } }),
    ).toBe(true)
  })

  it('holds the target itself', () => {
    expect(
      withinScrollTravel({ scrollLeft: 840, travel: { from: 280, to: 840 } }),
    ).toBe(true)
  })

  it('holds a target overshot by less than a pixel', () => {
    expect(
      withinScrollTravel({ scrollLeft: 840.4, travel: { from: 280, to: 840 } }),
    ).toBe(true)
  })

  it('drops a position past the target', () => {
    expect(
      withinScrollTravel({ scrollLeft: 1120, travel: { from: 280, to: 840 } }),
    ).toBe(false)
  })

  it('drops a position behind the origin', () => {
    expect(
      withinScrollTravel({ scrollLeft: 0, travel: { from: 280, to: 840 } }),
    ).toBe(false)
  })

  it('reads a travel that runs backwards the same way', () => {
    expect(
      withinScrollTravel({ scrollLeft: 400, travel: { from: 840, to: 280 } }),
    ).toBe(true)
    expect(
      withinScrollTravel({ scrollLeft: 1120, travel: { from: 840, to: 280 } }),
    ).toBe(false)
  })
})
