import { cn } from '@/lib/utils'

import { tableContainerVariants, tableVariants } from './classnames'
import type { TableProps } from './types'

export function Table({ className, ...props }: TableProps) {
  return (
    <div className={tableContainerVariants()}>
      <table
        data-slot="table"
        className={cn(tableVariants(), className)}
        {...props}
      />
    </div>
  )
}
