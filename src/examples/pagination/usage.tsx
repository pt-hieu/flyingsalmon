import { useState } from 'react'

import { Pagination } from '@/registry/ui/pagination'

export function PaginationUsage() {
  const [page, setPage] = useState(1)

  return <Pagination page={page} pageCount={12} onPageChange={setPage} />
}
