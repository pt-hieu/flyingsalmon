import { cn } from '@/lib/utils'

import { tableBodyVariants } from './classnames'
import type { TableSectionProps } from './types'

export function TableBody({ className, ...props }: TableSectionProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(tableBodyVariants(), className)}
      {...props}
    />
  )
}
