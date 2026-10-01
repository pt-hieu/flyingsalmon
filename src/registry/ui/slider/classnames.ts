import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { FieldLabelPlacement, fieldLabelVariants } from '@/registry/lib/field'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const sliderWrapperClassName = cn(
  'grid grid-cols-[minmax(0,var(--container-md))_auto] items-center justify-start gap-x-4',
  '[--slider-thumb-width:--spacing(7)]',
)

export function sliderLabelClassName({
  disabled,
  required,
}: {
  disabled: boolean
  required: boolean
}) {
  return cn(
    'col-start-1 row-start-1',
    fieldLabelVariants({
      placement: FieldLabelPlacement.Above,
      error: false,
      disabled,
      required,
    }),
  )
}

export const sliderActionClassName = 'col-start-2 row-start-2'

export const sliderWellVariants = cva(
  'bg-secondary col-start-1 row-start-2 rounded-full p-0.5',
  {
    variants: {
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export const sliderRootClassName =
  'relative flex h-5 w-full touch-none items-center select-none'

export const sliderTrackClassName = 'relative h-5 w-full grow'

export const sliderFillClassName =
  'bg-slider-fill absolute inset-y-0 left-0 rounded-full transition-[width] duration-(--motion-fast)'

export const sliderStepDotClassName =
  'bg-muted-foreground absolute top-1/2 size-1 -translate-1/2 rounded-full'

export const sliderThumbClassName = cn(
  'border-indicator bg-card block h-5 w-(--slider-thumb-width) cursor-grab rounded-full border-2 active:cursor-grabbing',
  'focus-visible:ring-indicator',
  offsetFocusRingGeometry,
)

export const sliderDescriptionVariants = cva(
  'text-foreground col-start-1 row-start-3 mt-2 text-sm font-medium',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)
