import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { boundaryFocusWithinRingGeometry } from '@/registry/lib/interaction'

import { NumberFieldSize } from './types'

export const numberFieldWrapperClassName = 'flex w-full flex-col'

export const numberFieldInputClassName = cn(
  'text-foreground h-full min-w-0 flex-1 outline-hidden',
  'placeholder:text-muted-foreground',
)

export const numberFieldAffixClassName = 'text-muted-foreground shrink-0'

export const numberFieldSpinnerErrorClassName = 'text-destructive'

export const numberFieldBoxVariants = cva(
  cn(
    'border-input bg-background flex w-full items-center overflow-hidden rounded-md border',
    'transition-[border-color,box-shadow] duration-(--motion-fast)',
    'focus-within:ring-ring',
    boundaryFocusWithinRingGeometry,
  ),
  {
    variants: {
      size: {
        [NumberFieldSize.Default]: 'h-9 text-sm',
        [NumberFieldSize.Small]: 'h-8 text-sm',
      },
      error: {
        true: 'border-destructive focus-within:ring-destructive',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
      readOnly: {
        true: 'bg-muted focus-within:border-muted',
        false: '',
      },
    },
    compoundVariants: [
      {
        disabled: false,
        readOnly: false,
        error: false,
        class:
          'hover:not-focus-within:border-neutral-300 dark:hover:not-focus-within:border-neutral-600',
      },
    ],
    defaultVariants: {
      size: NumberFieldSize.Default,
      error: false,
      disabled: false,
      readOnly: false,
    },
  },
)

export const numberFieldContentVariants = cva(
  'flex h-full min-w-0 flex-1 items-center gap-1.5',
  {
    variants: {
      size: {
        [NumberFieldSize.Default]: 'px-3',
        [NumberFieldSize.Small]: 'px-2.5',
      },
    },
    defaultVariants: {
      size: NumberFieldSize.Default,
    },
  },
)

export const numberFieldSpinButtonVariants = cva(
  cn(
    'text-foreground bg-muted border-input flex shrink-0 cursor-pointer items-center justify-center border-l',
    'transition-colors duration-(--motion-fast)',
    'hover:bg-accent active:bg-neutral-300 dark:active:bg-neutral-600',
    'aria-disabled:text-muted-foreground aria-disabled:cursor-default',
    'aria-disabled:hover:bg-muted aria-disabled:active:bg-muted',
  ),
  {
    variants: {
      size: {
        [NumberFieldSize.Default]: 'h-full w-9 [&_svg]:size-4',
        [NumberFieldSize.Small]: 'h-full w-8 [&_svg]:size-3',
      },
      error: {
        true: 'border-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: NumberFieldSize.Default,
      error: false,
    },
  },
)

export const numberFieldLoadingSlotVariants = cva(
  'border-input flex h-full shrink-0 items-center justify-center border-l',
  {
    variants: {
      size: {
        [NumberFieldSize.Default]: 'w-18',
        [NumberFieldSize.Small]: 'w-16',
      },
      error: {
        true: 'border-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: NumberFieldSize.Default,
      error: false,
    },
  },
)
