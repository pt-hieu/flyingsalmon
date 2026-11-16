import { describe, expect, it } from 'vitest'

import { pageWindow } from '@/registry/ui/pagination/page-window'

describe('pageWindow', () => {
  it.each([
    ['shows both pages of a two-page list', 1, 2, [1, 2]],
    ['shows every page of a seven-page list', 4, 7, [1, 2, 3, 4, 5, 6, 7]],
    [
      'holds the first five pages and the last on page 1',
      1,
      20,
      [1, 2, 3, 4, 5, 20],
    ],
    [
      'holds the first five pages and the last on page 4',
      4,
      20,
      [1, 2, 3, 4, 5, 20],
    ],
    [
      'keeps both boundaries and the neighbours on page 5',
      5,
      20,
      [1, 4, 5, 6, 20],
    ],
    [
      'keeps both boundaries and the neighbours on page 10',
      10,
      20,
      [1, 9, 10, 11, 20],
    ],
    [
      'keeps both boundaries and the neighbours on page 16',
      16,
      20,
      [1, 15, 16, 17, 20],
    ],
    [
      'holds the first page and the last five on page 17',
      17,
      20,
      [1, 16, 17, 18, 19, 20],
    ],
    [
      'holds the first page and the last five on page 20',
      20,
      20,
      [1, 16, 17, 18, 19, 20],
    ],
  ])('%s', (_description, currentPage, pageCount, expectedPages) => {
    expect(pageWindow(currentPage, pageCount)).toEqual(expectedPages)
  })

  it.each([8, 9, 12, 25, 140])(
    'fills seven slots and hides at least two pages behind every gap of a %i-page list',
    (pageCount) => {
      for (let currentPage = 1; currentPage <= pageCount; currentPage += 1) {
        const pages = pageWindow(currentPage, pageCount)
        const hiddenRuns = pages
          .slice(1)
          .map((pageNumber, index) => pageNumber - pages[index] - 1)
        const gapCount = hiddenRuns.filter((hidden) => hidden > 0).length

        expect(pages.length + gapCount).toBe(7)
        expect(hiddenRuns.every((hidden) => hidden === 0 || hidden >= 2)).toBe(
          true,
        )
      }
    },
  )
})
