import { cn } from '@/lib/utils'

import { badgeIconVariants, badgeVariants } from './classnames'
import { BadgeVariant } from './types'

export interface BadgeProps extends Omit<
  React.ComponentProps<'span'>,
  'tabIndex'
> {
  variant?: BadgeVariant
  icon?: React.ReactNode
}

export function Badge({
  variant = BadgeVariant.Default,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon ? (
        <span aria-hidden className={badgeIconVariants()}>
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}
