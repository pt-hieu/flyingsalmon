import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

import { ButtonSize, ButtonVariant } from './types'

export const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow] duration-(--motion-fast)',
    offsetFocusRingGeometry,
    disabledInteraction,
  ),
  {
    variants: {
      variant: {
        [ButtonVariant.Default]:
          'bg-primary text-primary-foreground ring-primary hover:bg-indigo-300',
        [ButtonVariant.Outline]:
          'border-input border bg-background text-foreground ring-ring hover:bg-accent hover:text-accent-foreground',
        [ButtonVariant.Secondary]:
          'bg-secondary text-secondary-foreground ring-ring hover:bg-accent hover:text-accent-foreground',
        [ButtonVariant.Ghost]:
          'text-foreground ring-ring hover:bg-accent hover:text-accent-foreground',
        [ButtonVariant.Destructive]:
          'bg-error text-error-foreground ring-destructive hover:bg-red-200 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200',
        [ButtonVariant.Amber]:
          'bg-amber-400 text-neutral-950 ring-amber-400 hover:bg-amber-300',
      },
      size: {
        [ButtonSize.Default]: 'h-9 gap-2 px-4 text-sm',
        [ButtonSize.Small]: 'h-8 gap-1.5 px-3 text-sm',
        [ButtonSize.Icon]: 'size-9',
        [ButtonSize.IconSmall]: 'size-8',
      },
      loading: {
        true: 'cursor-default',
        false:
          'active:ring-offset-background active:ring-2 active:ring-offset-2',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.Default,
      size: ButtonSize.Default,
      loading: false,
    },
  },
)

export const buttonLeadingIconVariants = cva('flex shrink-0 items-center', {
  variants: {
    size: {
      [ButtonSize.Default]: '[&_svg]:size-4',
      [ButtonSize.Small]: '[&_svg]:size-3',
      [ButtonSize.Icon]: '[&_svg]:size-4',
      [ButtonSize.IconSmall]: '[&_svg]:size-3',
    },
  },
  defaultVariants: {
    size: ButtonSize.Default,
  },
})
