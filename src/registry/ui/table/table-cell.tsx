import { use, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableCellVariants } from './classnames'
import { TableRowInteractiveContext } from './context'

export type TableCellProps = ComponentProps<'td'>

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
