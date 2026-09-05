import { cva } from 'class-variance-authority'

import { AlertSize, AlertVariant } from './types'

export const alertVariants = cva(
  'bg-card text-card-foreground border-border flex items-start rounded-lg border text-sm',
  {
    variants: {
      size: {
        [AlertSize.Default]: 'gap-3 p-4',
        [AlertSize.Small]: 'gap-2.5 p-3',
      },
    },
    defaultVariants: {
      size: AlertSize.Default,
    },
  },
)

export const alertIconVariants = cva('flex h-5 shrink-0 items-center', {
  variants: {
    variant: {
      [AlertVariant.Info]: 'text-primary',
      [AlertVariant.Success]: 'text-success-foreground',
      [AlertVariant.Warning]: 'text-warning-foreground',
      [AlertVariant.Error]: 'text-error-foreground',
    },
    size: {
      [AlertSize.Default]: '[&_svg]:size-5',
      [AlertSize.Small]: '[&_svg]:size-4',
    },
  },
  defaultVariants: {
    variant: AlertVariant.Info,
    size: AlertSize.Default,
  },
})

export const alertPresenceClassName = 'overflow-hidden'

export const alertContentClassName = 'flex min-w-0 flex-1 flex-col gap-1'

export const alertCloseButtonClassName =
  'text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-offset-card active:ring-offset-card -my-1.5 -mr-1.5'

export const alertTitleClassName = 'font-sans font-medium'

export const alertDescriptionClassName = 'text-muted-foreground'
