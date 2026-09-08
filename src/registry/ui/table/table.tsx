import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { tableContainerVariants, tableVariants } from './classnames'

export type TableProps = ComponentProps<'table'>

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
