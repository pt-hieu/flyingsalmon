import { cva } from 'class-variance-authority'

import { AvatarColor, AvatarSize } from './types'

export const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full leading-none select-none',
  {
    variants: {
      size: {
        [AvatarSize.Default]: 'size-8 text-xs',
        [AvatarSize.Small]: 'size-6 text-[0.625rem]',
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
  'flex size-full items-center justify-center font-medium text-neutral-950',
  {
    variants: {
      color: {
        [AvatarColor.Orange]: 'bg-orange-400',
        [AvatarColor.Amber]: 'bg-amber-400',
        [AvatarColor.Green]: 'bg-green-400',
        [AvatarColor.Teal]: 'bg-teal-400',
        [AvatarColor.Sky]: 'bg-sky-400',
        [AvatarColor.Indigo]: 'bg-indigo-400',
        [AvatarColor.Purple]: 'bg-purple-400',
        [AvatarColor.Pink]: 'bg-pink-400',
      },
    },
    defaultVariants: {
      color: AvatarColor.Indigo,
    },
  },
)
