import { cn } from '@/lib/utils'

import { tableBodyClassName } from './classnames'
import type { TableSectionProps } from './types'

export function TableBody({ className, ...props }: TableSectionProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(tableBodyClassName, className)}
      {...props}
    />
  )
}
