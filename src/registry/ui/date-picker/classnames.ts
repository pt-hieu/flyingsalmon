import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { FieldLabelPlacement } from '@/registry/lib/field'
import {
  boundaryFocusWithinRingGeometry,
  invalidBoundaryFocusWithinRingGeometry,
} from '@/registry/lib/interaction'
import { ButtonSize, ButtonVariant, buttonVariants } from '@/registry/ui/button'

import { DatePickerSize } from './types'

export const datePickerWrapperVariants = cva('flex w-full', {
  variants: {
    labelPlacement: {
      [FieldLabelPlacement.Above]: 'flex-col',
      [FieldLabelPlacement.Beside]: 'items-center gap-3',
    },
  },
  defaultVariants: {
    labelPlacement: FieldLabelPlacement.Above,
  },
})

export const datePickerFieldColumnClassName = 'flex min-w-0 flex-1 flex-col'

export const datePickerBoxVariants = cva(
  cn(
    'border-input bg-background text-foreground relative flex w-full items-center rounded-md border',
    'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
    'hover:not-focus-within:border-neutral-300 dark:hover:not-focus-within:border-neutral-600',
    'focus-within:ring-ring',
    boundaryFocusWithinRingGeometry,
    'aria-invalid:border-destructive aria-invalid:focus-within:ring-destructive',
    invalidBoundaryFocusWithinRingGeometry,
  ),
  {
    variants: {
      size: {
        [DatePickerSize.Default]: 'h-9 gap-1 pr-1 pl-3 text-sm',
        [DatePickerSize.Small]: 'h-8 gap-1 pr-0.5 pl-2.5 text-sm',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      size: DatePickerSize.Default,
      disabled: false,
    },
  },
)

export const datePickerSegmentGroupClassName = 'flex items-center'

export const datePickerSegmentClassName = cn(
  'rounded-sm px-0.5 tabular-nums outline-hidden',
  'transition-colors duration-(--motion-fast)',
  'data-placeholder:text-muted-foreground',
  'data-focused:text-indicator',
  'data-[type=literal]:text-muted-foreground data-[type=literal]:px-0',
)

export const datePickerRangeSeparatorClassName =
  'text-muted-foreground shrink-0 px-1'

export const datePickerEndSlotClassName =
  'ml-auto flex shrink-0 items-center gap-0.5'

export const datePickerIconButtonClassName = cn(
  buttonVariants({ variant: ButtonVariant.Ghost, size: ButtonSize.IconSmall }),
  'text-muted-foreground',
)

export const datePickerIconClassName = 'size-4'

export const datePickerHiddenInputClassName =
  'pointer-events-none absolute inset-0 -z-10 size-full opacity-0'

export const datePickerPanelClassName = cn(
  'bg-popover text-popover-foreground border-border z-50 rounded-lg border p-3',
  'origin-(--radix-popper-transform-origin) outline-hidden',
  'data-[state=open]:animate-floating-anchored-enter',
  'data-[state=closed]:animate-floating-anchored-exit',
)
