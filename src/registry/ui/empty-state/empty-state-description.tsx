import { cn } from '@/lib/utils'

import { emptyStateDescriptionClassName } from './classnames'

export function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(emptyStateDescriptionClassName, className)}
      {...props}
    />
  )
}
