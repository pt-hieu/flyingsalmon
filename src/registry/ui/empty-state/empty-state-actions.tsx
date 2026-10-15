import { cn } from '@/lib/utils'

import { emptyStateActionsClassName } from './classnames'

export interface EmptyStateActionsProps extends React.ComponentProps<'div'> {}

export function EmptyStateActions({
  className,
  ...props
}: EmptyStateActionsProps) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn(emptyStateActionsClassName, className)}
      {...props}
    />
  )
}
