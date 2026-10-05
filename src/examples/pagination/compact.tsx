import { useState } from 'react'

import { Pagination } from '@/registry/ui/pagination'

export function PaginationCompact() {
  const [page, setPage] = useState(3)

  return (
    <Pagination page={page} pageCount={12} onPageChange={setPage} compact />
  )
}
