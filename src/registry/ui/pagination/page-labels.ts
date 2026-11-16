export function pageItemLabel(page: number): string {
  return `Page ${page}`
}

export function defaultPageLabel(
  currentPage: number,
  pageCount: number,
): string {
  return `Page ${currentPage} of ${pageCount}`
}
