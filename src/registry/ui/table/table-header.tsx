import { cn } from '@/lib/utils'

import { tableHeaderVariants } from './classnames'
import type { TableSectionProps } from './types'

export function TableHeader({ className, ...props }: TableSectionProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn(tableHeaderVariants(), className)}
      {...props}
    />
  )
}
