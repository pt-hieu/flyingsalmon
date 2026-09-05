import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  boundaryFocusRingGeometry,
  disabledInteraction,
  invalidBoundaryFocusRingGeometry,
} from '@/registry/lib/interaction'

export const textareaWrapperClassName = 'flex w-full flex-col'

export const textareaFieldRowClassName = 'relative flex'

export const textareaSpinnerSlotClassName =
  'pointer-events-none absolute top-2 right-3 flex items-center'

export const textareaSpinnerErrorClassName = 'text-destructive'

export const textareaVariants = cva(
  cn(
    'border-input bg-background text-foreground w-full rounded-md border px-3 py-2 text-sm',
    'field-sizing-content resize-none',
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
      loading: {
        true: 'pr-9',
        false: '',
      },
    },
    defaultVariants: {
      loading: false,
    },
  },
)
