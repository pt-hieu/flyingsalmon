import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableHeadCellVariants } from './classnames'
import { TableHeadCellScope } from './types'

export interface TableHeadCellProps extends Omit<
  ComponentProps<'th'>,
  'scope'
> {
  scope?: TableHeadCellScope
}

export function TableHeadCell({
  scope = TableHeadCellScope.Col,
  className,
  ...props
}: TableHeadCellProps) {
  return (
    <th
      data-slot="table-head-cell"
      scope={scope}
      className={cn(tableHeadCellVariants({ scope }), className)}
      {...props}
    />
  )
}
