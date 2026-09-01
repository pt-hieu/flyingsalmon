import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const skeletonVariants = cva('animate-skeleton-pulse bg-skeleton', {
  variants: {
    variant: {
      text: 'h-[1em] w-full rounded-sm',
      circle: 'rounded-full',
      rectangle: 'rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

export type SkeletonVariant = NonNullable<
  VariantProps<typeof skeletonVariants>['variant']
>

export interface SkeletonProps extends Omit<
  React.ComponentProps<'div'>,
  'aria-hidden' | 'children'
> {
  variant?: SkeletonVariant
}

export function Skeleton({
  variant = 'text',
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
