import { cn } from '@/lib/utils'

import { tableFooterClassName } from './classnames'
import type { TableSectionProps } from './types'

export function TableFooter({ className, ...props }: TableSectionProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(tableFooterClassName, className)}
      {...props}
    />
  )
}
