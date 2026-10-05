import { Link, useSearch } from '@tanstack/react-router'

import { Pagination } from '@/registry/ui/pagination'

export function PaginationLinks() {
  const { linkPage } = useSearch({ from: '/_docs/components/pagination' })

  return (
    <Pagination
      page={linkPage ?? 1}
      pageCount={12}
      renderPageLink={(targetPage, children) => (
        <Link
          to="/components/pagination"
          search={{ linkPage: targetPage }}
          resetScroll={false}
        >
          {children}
        </Link>
      )}
    />
  )
}
