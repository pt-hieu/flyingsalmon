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
    'text-primary-foreground grid size-5 shrink-0 place-items-center rounded-sm border',
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
          'dark:enabled:hover:data-[state=unchecked]:border-red-300',
          'enabled:hover:data-[state=checked]:border-red-700 enabled:hover:data-[state=checked]:bg-red-700',
          'enabled:hover:data-[state=indeterminate]:border-red-700 enabled:hover:data-[state=indeterminate]:bg-red-700',
          'dark:enabled:hover:data-[state=checked]:border-red-500 dark:enabled:hover:data-[state=checked]:bg-red-500',
          'dark:enabled:hover:data-[state=indeterminate]:border-red-500 dark:enabled:hover:data-[state=indeterminate]:bg-red-500',
        ),
        false: cn(
          'border-input focus-visible:ring-ring',
          'data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary',
          'data-[state=checked]:border-primary data-[state=indeterminate]:border-primary',
          'enabled:hover:data-[state=unchecked]:border-primary',
          'enabled:hover:data-[state=checked]:border-indigo-700 enabled:hover:data-[state=checked]:bg-indigo-700',
          'enabled:hover:data-[state=indeterminate]:border-indigo-700 enabled:hover:data-[state=indeterminate]:bg-indigo-700',
          'dark:enabled:hover:data-[state=checked]:border-indigo-500 dark:enabled:hover:data-[state=checked]:bg-indigo-500',
          'dark:enabled:hover:data-[state=indeterminate]:border-indigo-500 dark:enabled:hover:data-[state=indeterminate]:bg-indigo-500',
        ),
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)
