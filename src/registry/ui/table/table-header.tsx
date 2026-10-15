import { cn } from '@/lib/utils'

import { tableHeaderClassName } from './classnames'
import type { TableSectionProps } from './types'

export function TableHeader({ className, ...props }: TableSectionProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn(tableHeaderClassName, className)}
      {...props}
    />
  )
}
