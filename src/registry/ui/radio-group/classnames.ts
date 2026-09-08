import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

import { RadioGroupOrientation } from './types'

export const radioGroupWrapperClassName = 'flex flex-col'

export const radioGroupItemRowClassName = 'flex items-center gap-2'

export const radioGroupDotClassName = cn(
  'bg-primary-foreground size-2 rounded-full opacity-0',
  'transition-opacity duration-(--motion-base)',
  'group-data-[state=checked]:opacity-100',
)

export const radioGroupListVariants = cva('flex', {
  variants: {
    orientation: {
      [RadioGroupOrientation.Vertical]: 'flex-col gap-3',
      [RadioGroupOrientation.Horizontal]: 'flex-row gap-6',
    },
  },
  defaultVariants: {
    orientation: RadioGroupOrientation.Vertical,
  },
})

export const radioGroupItemVariants = cva(
  cn(
    'group grid size-5 shrink-0 place-items-center rounded-full border',
    'transition-[background-color,border-color,box-shadow] duration-(--motion-fast)',
    offsetFocusRingGeometry,
    disabledInteraction,
  ),
  {
    variants: {
      error: {
        true: cn(
          'border-destructive focus-visible:ring-destructive',
          'data-[state=checked]:bg-destructive',
          'enabled:hover:data-[state=unchecked]:border-red-700',
          'dark:enabled:hover:data-[state=unchecked]:border-red-300',
          'enabled:hover:data-[state=checked]:border-red-700 enabled:hover:data-[state=checked]:bg-red-700',
          'dark:enabled:hover:data-[state=checked]:border-red-500 dark:enabled:hover:data-[state=checked]:bg-red-500',
        ),
        false: cn(
          'border-input focus-visible:ring-ring',
          'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
          'enabled:hover:data-[state=unchecked]:border-primary',
          'enabled:hover:data-[state=checked]:border-indigo-300 enabled:hover:data-[state=checked]:bg-indigo-300',
        ),
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)
