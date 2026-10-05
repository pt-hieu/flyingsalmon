import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { FieldLabelPlacement, fieldLabelVariants } from '@/registry/lib/field'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const sliderWrapperClassName = cn(
  'flex max-w-(--container-md) flex-col',
  '[--slider-thumb-width:--spacing(7)]',
)

export function sliderLabelClassName({
  disabled,
  required,
}: {
  disabled: boolean
  required: boolean
}) {
  return fieldLabelVariants({
    placement: FieldLabelPlacement.Above,
    error: false,
    disabled,
    required,
  })
}

export const sliderWellVariants = cva('bg-secondary rounded-full p-0.5', {
  variants: {
    disabled: {
      true: 'pointer-events-none opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const sliderRootClassName =
  'relative flex h-5 w-full cursor-pointer touch-none items-center select-none'

export const sliderTrackClassName = 'relative h-5 w-full grow'

export const sliderFillClassName =
  'bg-slider-fill absolute inset-y-0 left-0 w-(--slider-fill-width) rounded-full transition-[width] duration-(--motion-fast)'

export const sliderStepDotClassName =
  'bg-muted-foreground absolute top-1/2 left-(--slider-step-dot-offset) size-1 -translate-1/2 rounded-full'

export const sliderThumbClassName = cn(
  'border-indicator bg-card block h-5 w-(--slider-thumb-width) cursor-grab rounded-full border-2 active:cursor-grabbing',
  'focus-visible:ring-indicator',
  offsetFocusRingGeometry,
)
