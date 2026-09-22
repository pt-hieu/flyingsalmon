import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

export const checkboxWrapperClassName = 'flex flex-col'

export const checkboxRowClassName = 'flex items-center gap-2'

export const checkboxMarkClassName = 'size-3.5'

export const checkboxVariants = cva(
  cn(
    'text-indicator-foreground grid size-5 shrink-0 place-items-center rounded-sm border',
    'transition-[background-color,border-color,box-shadow] duration-(--motion-fast)',
    offsetFocusRingGeometry,
    disabledInteraction,
  ),
  {
    variants: {
      error: {
        true: cn(
          'border-destructive focus-visible:ring-destructive',
          'data-[state=checked]:bg-destructive data-[state=indeterminate]:bg-destructive',
          'enabled:hover:data-[state=unchecked]:border-red-700',
          'enabled:hover:data-[state=checked]:border-red-700 enabled:hover:data-[state=checked]:bg-red-700',
          'enabled:hover:data-[state=indeterminate]:border-red-700 enabled:hover:data-[state=indeterminate]:bg-red-700',
        ),
        false: cn(
          'border-input focus-visible:ring-ring',
          'data-[state=checked]:bg-indicator data-[state=indeterminate]:bg-indicator',
          'data-[state=checked]:border-indicator data-[state=indeterminate]:border-indicator',
          'enabled:hover:data-[state=unchecked]:border-indicator',
          'enabled:hover:data-[state=checked]:border-orange-400 enabled:hover:data-[state=checked]:bg-orange-400',
          'enabled:hover:data-[state=indeterminate]:border-orange-400 enabled:hover:data-[state=indeterminate]:bg-orange-400',
        ),
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)
