import { cn } from '@/lib/utils'

import { emptyStateActionsClassName } from './classnames'

export function EmptyStateActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn(emptyStateActionsClassName, className)}
      {...props}
    />
  )
}
