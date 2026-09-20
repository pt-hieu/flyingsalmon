import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'

export const paginationClassName = 'flex items-center'

export const paginationListClassName = 'flex items-center gap-1'

export const paginationItemVariants = cva(
  cn(
    'relative inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md px-2 text-sm tabular-nums',
    'transition-colors duration-(--motion-fast)',
    'hover:text-foreground active:text-foreground',
    'focus-visible:ring-ring',
    offsetFocusRingGeometry,
    disabledInteraction,
    '[&_svg]:size-4',
  ),
  {
    variants: {
      current: {
        true: 'text-foreground font-medium',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      current: false,
    },
  },
)

export const paginationInertItemClassName = 'pointer-events-none opacity-50'

export const paginationIndicatorClassName =
  'bg-indicator absolute inset-x-1 bottom-0 h-0.5 rounded-full'

export const paginationEllipsisClassName =
  'text-muted-foreground inline-flex h-8 min-w-8 items-center justify-center text-sm'

export const paginationCompactLabelClassName =
  'text-muted-foreground px-2 text-sm tabular-nums'
