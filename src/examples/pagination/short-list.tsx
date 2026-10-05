import { useState } from 'react'

import { Pagination } from '@/registry/ui/pagination'

export function PaginationShortList() {
  const [page, setPage] = useState(1)

  return <Pagination page={page} pageCount={5} onPageChange={setPage} />
}
