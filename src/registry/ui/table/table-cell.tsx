import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableCellVariants } from './classnames'

export interface TableCellProps extends ComponentProps<'td'> {
  rowLink?: boolean
}

export function TableCell({
  rowLink = false,
  className,
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-row-link={rowLink || undefined}
      className={cn(tableCellVariants(), className)}
      {...props}
    />
  )
}
