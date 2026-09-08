import { cn } from '@/lib/utils'

import { tableFooterVariants } from './classnames'
import type { TableSectionProps } from './types'

export function TableFooter({ className, ...props }: TableSectionProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(tableFooterVariants(), className)}
      {...props}
    />
  )
}
