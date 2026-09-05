import { cn } from '@/lib/utils'

import { skeletonVariants } from './classnames'
import { SkeletonVariant } from './types'

export interface SkeletonProps extends Omit<
  React.ComponentProps<'div'>,
  'aria-hidden' | 'children'
> {
  variant?: SkeletonVariant
}

export function Skeleton({
  variant = SkeletonVariant.Text,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-variant={variant}
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
      aria-hidden="true"
    />
  )
}
