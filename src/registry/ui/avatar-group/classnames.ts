import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { AvatarSize, avatarVariants } from '../avatar'

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
  'ring-background relative z-(--avatar-group-layer) translate-x-(--avatar-group-offset) rounded-full ring-2',
  'transition-[translate] duration-(--motion-base) ease-out',
  'focus-visible:ring-indicator focus-visible:outline-hidden',
)

const avatarGroupChipClassName = cn(
  'bg-secondary text-secondary-foreground font-medium',
  avatarGroupItemClassName,
)

export function avatarGroupChipVariants({ size }: { size: AvatarSize }) {
  return cn(avatarVariants({ size }), avatarGroupChipClassName)
}
