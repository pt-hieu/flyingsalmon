import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableRowVariants } from './classnames'

export interface TableRowProps extends ComponentProps<'tr'> {
  interactive?: boolean
}

export function TableRow({
  interactive = false,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-interactive={interactive || undefined}
      className={cn(tableRowVariants({ interactive }), className)}
      {...props}
    />
  )
}
