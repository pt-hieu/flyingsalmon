import { cn } from '@/lib/utils'

import { EmptyState, type EmptyStateProps } from '../empty-state'

import { errorStateClassName } from './classnames'

export interface ErrorStateProps extends Omit<EmptyStateProps, 'role'> {}

export function ErrorState({ className, ...props }: ErrorStateProps) {
  return (
    <EmptyState
      data-slot="error-state"
      className={cn(errorStateClassName, className)}
      {...props}
      role="alert"
    />
  )
}
