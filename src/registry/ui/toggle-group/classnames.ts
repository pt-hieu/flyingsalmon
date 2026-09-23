import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

import { ToggleGroupSize } from './types'

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
    'border-secondary bg-secondary text-secondary-foreground ring-accent',
    'enabled:hover:border-accent',
    'data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:ring-indicator',
    'enabled:hover:data-[state=on]:border-orange-700 enabled:hover:data-[state=on]:bg-orange-700',
  ),
  {
    variants: {
      size: {
        [ToggleGroupSize.Default]: 'h-9 gap-2 px-4 text-sm',
        [ToggleGroupSize.Small]: 'h-8 gap-1.5 px-3 text-sm',
      },
    },
    defaultVariants: {
      size: ToggleGroupSize.Default,
    },
  },
)
