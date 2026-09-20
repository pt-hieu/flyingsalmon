const pagesShownWithoutEllipsis = 7
const pagesShownBesideOneBoundary = 5

export function pageWindow(currentPage: number, pageCount: number): number[] {
  if (pageCount <= pagesShownWithoutEllipsis) {
    return pagesFromTo(1, pageCount)
  }

  const lastPageOfStartRun = pagesShownBesideOneBoundary
  const firstPageOfEndRun = pageCount - pagesShownBesideOneBoundary + 1

  if (currentPage + 1 <= lastPageOfStartRun) {
    return [...pagesFromTo(1, lastPageOfStartRun), pageCount]
  }

  if (currentPage - 1 >= firstPageOfEndRun) {
    return [1, ...pagesFromTo(firstPageOfEndRun, pageCount)]
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, pageCount]
}

export function pageItemLabel(page: number): string {
  return `Page ${page}`
}

export function defaultPageLabel(
  currentPage: number,
  pageCount: number,
): string {
  return `Page ${currentPage} of ${pageCount}`
}

function pagesFromTo(firstPage: number, lastPage: number): number[] {
  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_unused, offset) => firstPage + offset,
  )
}
