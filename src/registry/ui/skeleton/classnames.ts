import { cva } from 'class-variance-authority'

import { SkeletonVariant } from './types'

export const skeletonVariants = cva('animate-skeleton-pulse bg-skeleton', {
  variants: {
    variant: {
      [SkeletonVariant.Text]: 'h-[1em] w-full rounded-sm',
      [SkeletonVariant.Circle]: 'rounded-full',
      [SkeletonVariant.Rectangle]: 'rounded-lg',
    },
  },
  defaultVariants: {
    variant: SkeletonVariant.Text,
  },
})
