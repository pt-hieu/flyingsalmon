import { type ComponentProps, useRef } from 'react'

import { cn } from '@/lib/utils'

import { tableClassName, tableContainerClassName } from './classnames'
import { useHorizontalOverflow } from './use-horizontal-overflow'
import { scrollRegionProps } from './utils'

export interface TableProps extends ComponentProps<'table'> {
  scrollRegionLabel?: string
}

export function Table({ scrollRegionLabel, className, ...props }: TableProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overflows = useHorizontalOverflow(containerRef)

  return (
    <div
      ref={containerRef}
      className={tableContainerClassName}
      {...scrollRegionProps(
        overflows,
        scrollRegionLabel ?? props['aria-label'],
      )}
    >
      <table
        data-slot="table"
        className={cn(tableClassName, className)}
        {...props}
      />
    </div>
  )
}
