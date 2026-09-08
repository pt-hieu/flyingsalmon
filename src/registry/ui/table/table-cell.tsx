import { use } from 'react'

import { cn } from '@/lib/utils'

import { tableCellVariants } from './classnames'
import { TableRowInteractiveContext } from './context'
import type { TableCellProps } from './types'

export function TableCell({ className, ...props }: TableCellProps) {
  const interactive = use(TableRowInteractiveContext)

  return (
    <td
      data-slot="table-cell"
      className={cn(tableCellVariants({ interactive }), className)}
      {...props}
    />
  )
}
