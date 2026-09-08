import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableRowVariants } from './classnames'
import { TableRowInteractiveContext } from './context'

export interface TableRowProps extends ComponentProps<'tr'> {
  interactive?: boolean
}

export function TableRow({
  interactive = false,
  className,
  ...props
}: TableRowProps) {
  return (
    <TableRowInteractiveContext value={interactive}>
      <tr
        data-slot="table-row"
        className={cn(tableRowVariants({ interactive }), className)}
        {...props}
      />
    </TableRowInteractiveContext>
  )
}
