import { use } from 'react'

import { cn } from '@/lib/utils'

import { emptyStateIconVariants } from './classnames'
import { EmptyStateContext } from './context'

export interface EmptyStateIconProps extends Omit<
  React.ComponentProps<'div'>,
  'aria-hidden'
> {}

export function EmptyStateIcon({ className, ...props }: EmptyStateIconProps) {
  const { size } = use(EmptyStateContext)

  return (
    <div
      data-slot="empty-state-icon"
      className={cn(emptyStateIconVariants({ size }), className)}
      {...props}
      aria-hidden="true"
    />
  )
}
