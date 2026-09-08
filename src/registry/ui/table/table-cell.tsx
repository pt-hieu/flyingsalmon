import { use, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableCellVariants } from './classnames'
import { TableRowInteractiveContext } from './context'

export interface TableCellProps extends ComponentProps<'td'> {
  rowLink?: boolean
}

export function TableCell({
  rowLink = false,
  className,
  ...props
}: TableCellProps) {
  const interactive = use(TableRowInteractiveContext)

  return (
    <td
      data-slot="table-cell"
      data-row-link={(interactive && rowLink) || undefined}
      className={cn(tableCellVariants({ interactive, rowLink }), className)}
      {...props}
    />
  )
}
