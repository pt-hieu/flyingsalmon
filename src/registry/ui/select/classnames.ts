import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  boundaryFocusRingGeometry,
  disabledInteraction,
  invalidBoundaryFocusRingGeometry,
} from '@/registry/lib/interaction'
import {
  menuContent,
  menuItem,
  menuItemHighlighted,
  menuItemIconSlot,
  menuLabel,
  menuSeparator,
} from '@/registry/lib/menu'

import { SelectSize } from './types'

export const selectTriggerVariants = cva(
  cn(
    'group border-input bg-background text-foreground relative flex w-full items-center justify-between gap-2 rounded-md border',
    'data-[placeholder]:text-muted-foreground',
    'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
    'enabled:hover:not-focus-visible:border-orange-300',
    'focus-visible:ring-ring',
    boundaryFocusRingGeometry,
    disabledInteraction,
    'aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive',
    invalidBoundaryFocusRingGeometry,
  ),
  {
    variants: {
      size: {
        [SelectSize.Default]: 'h-9 pl-3 pr-9 text-sm',
        [SelectSize.Small]: 'h-8 pl-2.5 pr-8 text-sm',
      },
    },
    defaultVariants: {
      size: SelectSize.Default,
    },
  },
)

export const selectEndSlotVariants = cva(
  'pointer-events-none absolute flex items-center',
  {
    variants: {
      size: {
        [SelectSize.Default]: 'right-3',
        [SelectSize.Small]: 'right-2.5',
      },
    },
    defaultVariants: {
      size: SelectSize.Default,
    },
  },
)

export const selectWrapperClassName = 'flex w-full flex-col'

export const selectValueClassName = 'min-w-0 flex-1 truncate text-left'

export const selectSpinnerErrorClassName = 'text-destructive'

export const selectChevronClassName =
  'text-muted-foreground size-4 shrink-0 transition-transform duration-(--motion-base) group-data-[state=open]:rotate-180'

const selectContentAnimationClassName =
  'data-[state=open]:animate-floating-anchored-enter data-[state=closed]:animate-floating-anchored-exit'

export const selectPanelClassName = cn(
  menuContent,
  'w-(--radix-select-trigger-width) max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) outline-hidden',
  selectContentAnimationClassName,
)

export const selectItemClassName = cn(menuItem, menuItemHighlighted)

export const selectItemTextClassName = 'min-w-0 flex-1 truncate'

export const selectItemIndicatorIconClassName = 'text-indicator size-4'

export const selectItemIconSlotClassName = cn(
  menuItemIconSlot,
  '[&>svg]:size-4',
)

export const selectLabelClassName = menuLabel

export const selectSeparatorClassName = menuSeparator
