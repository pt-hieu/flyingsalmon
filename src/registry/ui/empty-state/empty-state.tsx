import { useId } from 'react'

import { cn } from '@/lib/utils'

import { emptyStateClassName } from './classnames'
import { EmptyStateContext } from './context'
import { EmptyStateSize } from './types'

export interface EmptyStateProps extends React.ComponentProps<'section'> {
  size?: EmptyStateSize
}

export function EmptyState({
  size = EmptyStateSize.Default,
  className,
  ...props
}: EmptyStateProps) {
  const titleId = useId()

  return (
    <EmptyStateContext value={{ size, titleId }}>
      <section
        data-slot="empty-state"
        aria-labelledby={titleId}
        className={cn(emptyStateClassName, className)}
        {...props}
      />
    </EmptyStateContext>
  )
}
