import { cva } from 'class-variance-authority'

import { AvatarColor, AvatarSize } from './types'

export const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full leading-none select-none',
  {
    variants: {
      size: {
        [AvatarSize.Default]: 'size-8 text-xs',
        [AvatarSize.Small]: 'size-6 text-2xs',
      },
    },
    defaultVariants: {
      size: AvatarSize.Default,
    },
  },
)

export const avatarImageVariants = cva('size-full object-cover', {
  variants: {
    loaded: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    loaded: false,
  },
})

export const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center font-medium',
  {
    variants: {
      color: {
        [AvatarColor.Sky]: 'bg-group-sky text-group-sky-foreground',
        [AvatarColor.Pink]: 'bg-group-pink text-group-pink-foreground',
        [AvatarColor.Teal]: 'bg-group-teal text-group-teal-foreground',
        [AvatarColor.Fuchsia]: 'bg-group-fuchsia text-group-fuchsia-foreground',
        [AvatarColor.Cyan]: 'bg-group-cyan text-group-cyan-foreground',
        [AvatarColor.Blue]: 'bg-group-blue text-group-blue-foreground',
      },
      neutral: {
        true: 'text-foreground bg-neutral-200',
        false: '',
      },
    },
  },
)
