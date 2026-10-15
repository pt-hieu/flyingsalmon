import { cn } from '@/lib/utils'

import { emptyStateDescriptionClassName } from './classnames'

export interface EmptyStateDescriptionProps extends React.ComponentProps<'p'> {}

export function EmptyStateDescription({
  className,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(emptyStateDescriptionClassName, className)}
      {...props}
    />
  )
}
