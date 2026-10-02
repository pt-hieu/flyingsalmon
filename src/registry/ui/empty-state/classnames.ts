import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { EmptyStateSize } from './types'

export const emptyStateClassName = cn(
  'flex h-min w-full flex-col items-center justify-center gap-2',
  'text-center',
)

export const emptyStateIconVariants = cva(
  cn(
    'bg-muted text-muted-foreground flex shrink-0 items-center justify-center',
    'rounded-full',
  ),
  {
    variants: {
      size: {
        [EmptyStateSize.Default]: 'size-12 [&_svg]:size-6',
        [EmptyStateSize.Small]: 'size-10 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      size: EmptyStateSize.Default,
    },
  },
)

export const emptyStateStickerVariants = cva('shrink-0 -rotate-3', {
  variants: {
    size: {
      [EmptyStateSize.Default]: 'max-w-60',
      [EmptyStateSize.Small]: 'max-w-40',
    },
  },
  defaultVariants: {
    size: EmptyStateSize.Default,
  },
})

export const emptyStateTitleVariants = cva('font-heading font-semibold', {
  variants: {
    size: {
      [EmptyStateSize.Default]: 'text-lg',
      [EmptyStateSize.Small]: 'text-base',
    },
  },
  defaultVariants: {
    size: EmptyStateSize.Default,
  },
})

export const emptyStateDescriptionClassName =
  'text-muted-foreground max-w-sm text-sm'

export const emptyStateActionsClassName = cn(
  'mt-2 flex flex-col items-center gap-2',
  'sm:flex-row sm:justify-center',
)
