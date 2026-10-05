import { useState } from 'react'

import { Pagination } from '@/registry/ui/pagination'

export function PaginationCustomLabel() {
  const [page, setPage] = useState(2)

  return (
    <Pagination
      page={page}
      pageCount={6}
      onPageChange={setPage}
      compact
      formatPageLabel={(currentPage, pageCount) =>
        `Day ${currentPage} of ${pageCount}`
      }
    />
  )
}
