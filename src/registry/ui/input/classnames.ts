import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  boundaryFocusRingGeometry,
  disabledInteraction,
  invalidBoundaryFocusRingGeometry,
} from '@/registry/lib/interaction'

import { InputSize } from './types'

export const inputWrapperClassName = 'flex w-full flex-col'

export const inputFieldRowClassName = 'relative flex items-center'

export const inputSpinnerErrorClassName = 'text-destructive'

export const inputVariants = cva(
  cn(
    'border-input bg-background text-foreground w-full rounded-md border',
    'placeholder:text-muted-foreground',
    'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
    'enabled:hover:not-focus-visible:border-neutral-300 dark:enabled:hover:not-focus-visible:border-neutral-600',
    'focus-visible:ring-ring',
    boundaryFocusRingGeometry,
    'read-only:bg-muted read-only:focus-visible:border-muted',
    disabledInteraction,
    'aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive',
    invalidBoundaryFocusRingGeometry,
  ),
  {
    variants: {
      size: {
        [InputSize.Default]: 'h-9 px-3 text-sm',
        [InputSize.Small]: 'h-8 px-2.5 text-sm',
      },
      hasEndSlot: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { size: InputSize.Default, hasEndSlot: true, class: 'pr-9' },
      { size: InputSize.Small, hasEndSlot: true, class: 'pr-8' },
    ],
    defaultVariants: {
      size: InputSize.Default,
      hasEndSlot: false,
    },
  },
)

export const inputEndSlotVariants = cva(
  'pointer-events-none absolute flex items-center [&_button]:pointer-events-auto',
  {
    variants: {
      size: {
        [InputSize.Default]: 'right-3',
        [InputSize.Small]: 'right-2.5',
      },
    },
    defaultVariants: {
      size: InputSize.Default,
    },
  },
)
