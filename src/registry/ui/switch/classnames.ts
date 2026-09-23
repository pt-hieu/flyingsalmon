import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

export const switchWrapperClassName = 'flex items-center gap-3'

export const switchThumbClassName = 'size-4'

export const switchVariants = cva(
  cn(
    'group inline-flex h-6 w-11 shrink-0 items-center rounded-full p-1',
    'data-[state=unchecked]:justify-start data-[state=checked]:justify-end',
    'data-[state=unchecked]:bg-muted-foreground data-[state=checked]:bg-indicator',
    'transition-[background-color,box-shadow] duration-(--motion-fast)',
    'focus-visible:ring-indicator',
    offsetFocusRingGeometry,
    disabledInteraction,
  ),
  {
    variants: {
      loading: {
        true: 'cursor-not-allowed',
        false: cn(
          'cursor-pointer',
          'data-[state=unchecked]:hover:bg-neutral-700',
          'data-[state=checked]:hover:bg-orange-700',
        ),
      },
    },
    defaultVariants: {
      loading: false,
    },
  },
)

export const switchThumbVariants = cva(
  cn(
    'block size-full rounded-full',
    'group-data-[state=unchecked]:bg-background group-data-[state=checked]:bg-indicator-foreground',
  ),
  {
    variants: {
      loading: {
        true: 'animate-switch-thumb-pulse',
        false: '',
      },
    },
    defaultVariants: {
      loading: false,
    },
  },
)

export const switchLabelVariants = cva(
  'text-foreground text-sm font-medium transition-opacity duration-(--motion-fast)',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
        false: '',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    compoundVariants: [
      {
        disabled: false,
        loading: false,
        className: 'cursor-pointer',
      },
    ],
    defaultVariants: {
      disabled: false,
      loading: false,
    },
  },
)
