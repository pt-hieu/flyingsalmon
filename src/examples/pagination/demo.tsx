import { useState } from 'react'

import { Pagination } from '@/registry/ui/pagination'

export function PaginationDemo() {
  const [page, setPage] = useState(8)

  return <Pagination page={page} pageCount={20} onPageChange={setPage} />
}
