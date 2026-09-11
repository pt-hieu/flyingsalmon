import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

import { ButtonSize, ButtonVariant } from './types'

const ringedSizes = [
  ButtonSize.Default,
  ButtonSize.Small,
  ButtonSize.Icon,
  ButtonSize.IconSmall,
]

const fieldSizes = [ButtonSize.FieldIcon, ButtonSize.FieldIconSmall]

export const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center font-medium whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow] duration-(--motion-fast)',
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
        [ButtonSize.Default]: 'h-9 gap-2 rounded-md px-4 text-sm',
        [ButtonSize.Small]: 'h-8 gap-1.5 rounded-md px-3 text-sm',
        [ButtonSize.Icon]: 'size-9 rounded-md',
        [ButtonSize.IconSmall]: 'size-8 rounded-md',
        [ButtonSize.FieldIcon]:
          'size-7 rounded-[calc(var(--radius-md)-4px)] focus-visible:outline-hidden',
        [ButtonSize.FieldIconSmall]:
          'size-6 rounded-[calc(var(--radius-md)-4px)] focus-visible:outline-hidden',
      },
      loading: {
        true: 'cursor-default',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: ringedSizes,
        class: offsetFocusRingGeometry,
      },
      {
        size: ringedSizes,
        loading: false,
        class:
          'active:ring-offset-background active:ring-2 active:ring-offset-2',
      },
      {
        size: fieldSizes,
        variant: ButtonVariant.Default,
        class: 'focus-visible:bg-indigo-300',
      },
      {
        size: fieldSizes,
        variant: [
          ButtonVariant.Outline,
          ButtonVariant.Secondary,
          ButtonVariant.Ghost,
        ],
        class: 'focus-visible:bg-accent focus-visible:text-accent-foreground',
      },
      {
        size: fieldSizes,
        variant: ButtonVariant.Destructive,
        class:
          'focus-visible:bg-red-200 focus-visible:text-red-800 dark:focus-visible:bg-red-900 dark:focus-visible:text-red-200',
      },
      {
        size: fieldSizes,
        variant: ButtonVariant.Amber,
        class: 'focus-visible:bg-amber-300',
      },
    ],
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
      [ButtonSize.FieldIcon]: '[&_svg]:size-4',
      [ButtonSize.FieldIconSmall]: '[&_svg]:size-4',
    },
  },
  defaultVariants: {
    size: ButtonSize.Default,
  },
})
