import { cn } from '@/lib/utils'

const skeletonVariantClasses = {
  text: 'h-[1em] w-full rounded-sm',
  circle: 'rounded-full',
  rectangle: 'rounded-lg',
} as const

export type SkeletonVariant = keyof typeof skeletonVariantClasses

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
      className={cn(
        'animate-skeleton-pulse bg-skeleton',
        skeletonVariantClasses[variant],
        className,
      )}
      {...props}
      aria-hidden="true"
    />
  )
}
