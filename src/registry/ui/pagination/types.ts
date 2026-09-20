export type PaginationPageLinkRenderer = (
  page: number,
  children: React.ReactNode,
) => React.ReactNode

export type PaginationPageLabelFormatter = (
  page: number,
  pageCount: number,
) => string
