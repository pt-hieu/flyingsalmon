import { cva } from 'class-variance-authority'

import { BadgeVariant } from './types'

export const badgeVariants = cva(
  'inline-flex h-5 w-fit shrink-0 items-center gap-1 rounded-full border px-2 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        [BadgeVariant.Default]:
          'border-transparent bg-primary text-primary-foreground',
        [BadgeVariant.Secondary]:
          'border-transparent bg-secondary text-secondary-foreground',
        [BadgeVariant.Outline]: 'border-border text-foreground',
        [BadgeVariant.Success]:
          'border-transparent bg-success text-success-foreground',
        [BadgeVariant.Warning]:
          'border-transparent bg-warning text-warning-foreground',
        [BadgeVariant.Error]:
          'border-transparent bg-error text-error-foreground',
      },
    },
    defaultVariants: {
      variant: BadgeVariant.Default,
    },
  },
)

export const badgeIconVariants = cva('flex shrink-0 [&>svg]:size-3')
