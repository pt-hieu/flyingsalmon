import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { AvatarSize } from '../avatar'

export const avatarGroupVariants = cva('isolate flex w-max items-center', {
  variants: {
    size: {
      [AvatarSize.Default]:
        '[--avatar-group-reveal:--spacing(3.5)] [&>*:not(:first-child)]:-ms-2',
      [AvatarSize.Small]:
        '[--avatar-group-reveal:--spacing(3)] [&>*:not(:first-child)]:-ms-1.5',
    },
  },
  defaultVariants: {
    size: AvatarSize.Default,
  },
})

export const avatarGroupItemClassName = cn(
  'ring-background relative z-(--avatar-group-layer) rounded-full ring-2',
  '[transition:translate_var(--motion-base)_ease-out]',
  'focus-visible:ring-primary focus-visible:outline-hidden',
)

export const avatarGroupChipVariants = cva(
  cn(
    'bg-secondary text-secondary-foreground inline-flex shrink-0 items-center justify-center rounded-full leading-none font-medium select-none',
    avatarGroupItemClassName,
  ),
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
