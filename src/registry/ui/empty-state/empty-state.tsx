import { useId } from 'react'

import { cn } from '@/lib/utils'

import { emptyStateClassName } from './classnames'
import { EmptyStateContext } from './context'
import { EmptyStateKind, EmptyStateSize } from './types'

export interface EmptyStateProps extends React.ComponentProps<'section'> {
  size?: EmptyStateSize
  kind?: EmptyStateKind
}

export function EmptyState({
  size = EmptyStateSize.Default,
  kind = EmptyStateKind.Empty,
  className,
  ...props
}: EmptyStateProps) {
  const titleId = useId()

  return (
    <EmptyStateContext value={{ size, kind, titleId }}>
      <section
        data-slot="empty-state"
        role={kind === EmptyStateKind.Error ? 'alert' : undefined}
        aria-labelledby={titleId}
        className={cn(emptyStateClassName, className)}
        {...props}
      />
    </EmptyStateContext>
  )
}
