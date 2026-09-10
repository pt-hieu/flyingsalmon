import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

import { ToggleGroupItemVariant, ToggleGroupSize } from './types'

export const toggleGroupWrapperClassName = 'flex flex-col'

export const toggleGroupListClassName = 'flex flex-wrap gap-2'

export const toggleGroupItemIconClassName =
  'flex shrink-0 items-center [&_svg]:size-4'

export const toggleGroupItemVariants = cva(
  cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border font-medium whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow] duration-(--motion-fast)',
    'active:ring-offset-background active:ring-2 active:ring-offset-2',
    offsetFocusRingGeometry,
    disabledInteraction,
  ),
  {
    variants: {
      variant: {
        [ToggleGroupItemVariant.Default]: cn(
          'border-secondary bg-secondary text-secondary-foreground ring-ring',
          'enabled:hover:border-accent',
          'data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:ring-primary',
          'enabled:hover:data-[state=on]:border-indigo-300 enabled:hover:data-[state=on]:bg-indigo-300',
        ),
        [ToggleGroupItemVariant.Amber]: cn(
          'border-amber-400 bg-amber-400 text-neutral-950 ring-ring',
          'enabled:hover:border-amber-300 enabled:hover:bg-amber-300',
          'data-[state=on]:border-neutral-950',
          'enabled:hover:data-[state=on]:border-neutral-950',
        ),
      },
      size: {
        [ToggleGroupSize.Default]: 'h-9 gap-2 px-4 text-sm',
        [ToggleGroupSize.Small]: 'h-8 gap-1.5 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: ToggleGroupItemVariant.Default,
      size: ToggleGroupSize.Default,
    },
  },
)
