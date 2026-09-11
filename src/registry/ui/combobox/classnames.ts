import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  boundaryFocusRingGeometry,
  boundaryFocusWithinRingGeometry,
} from '@/registry/lib/interaction'
import {
  menuContent,
  menuItem,
  menuItemHighlighted,
  menuItemIconSlot,
  menuLabel,
  menuSeparator,
} from '@/registry/lib/menu'
import {
  badgeIconVariants,
  badgeVariants,
  BadgeVariant,
} from '@/registry/ui/badge'
import { ButtonSize, ButtonVariant, buttonVariants } from '@/registry/ui/button'

import { ComboboxSize } from './types'

export const comboboxWrapperClassName = 'flex w-full flex-col'

export const comboboxFieldVariants = cva(
  cn(
    'bg-background text-foreground relative flex w-full flex-wrap items-center gap-1 rounded-md border py-1',
    'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
    boundaryFocusWithinRingGeometry,
  ),
  {
    variants: {
      size: {
        [ComboboxSize.Default]: 'min-h-9 pr-9 pl-3 text-sm',
        [ComboboxSize.Small]: 'min-h-8 pr-8 pl-2.5 text-sm',
      },
      invalid: {
        true: 'border-destructive focus-within:ring-destructive',
        false: cn(
          'border-input focus-within:ring-ring',
          'hover:not-focus-within:border-neutral-300 dark:hover:not-focus-within:border-neutral-600',
        ),
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      size: ComboboxSize.Default,
      invalid: false,
      disabled: false,
    },
  },
)

export const comboboxInputVariants = cva(
  cn(
    'text-foreground placeholder:text-muted-foreground min-w-24 flex-1 bg-transparent outline-hidden',
  ),
  {
    variants: {
      size: {
        [ComboboxSize.Default]: 'h-6',
        [ComboboxSize.Small]: 'h-5',
      },
    },
    defaultVariants: {
      size: ComboboxSize.Default,
    },
  },
)

// The box wraps chips onto new rows, so the slot is an overlay anchored to the
// first row rather than a flex sibling that would wrap away from the input.
export const comboboxEndSlotClassName = cn(
  'pointer-events-none absolute top-0.75 right-0.75 flex items-center',
  '[&_button]:pointer-events-auto',
)

export const comboboxEndSlotButtonVariants = cva('group', {
  variants: {
    size: {
      [ComboboxSize.Default]: cn(
        buttonVariants({
          variant: ButtonVariant.Ghost,
          size: ButtonSize.FieldIcon,
        }),
        'text-muted-foreground',
      ),
      [ComboboxSize.Small]: cn(
        buttonVariants({
          variant: ButtonVariant.Ghost,
          size: ButtonSize.FieldIconSmall,
        }),
        'text-muted-foreground',
      ),
    },
  },
  defaultVariants: {
    size: ComboboxSize.Default,
  },
})

export const comboboxSpinnerSlotVariants = cva(
  'flex shrink-0 items-center justify-center',
  {
    variants: {
      size: {
        [ComboboxSize.Default]: 'size-7',
        [ComboboxSize.Small]: 'size-6',
      },
    },
    defaultVariants: {
      size: ComboboxSize.Default,
    },
  },
)

export const comboboxChevronClassName = cn(
  'size-4 shrink-0',
  'transition-transform duration-(--motion-base) group-aria-expanded:rotate-180',
)

export const comboboxClearIconClassName = 'size-4 shrink-0'

export const comboboxSpinnerErrorClassName = 'text-destructive'

export const comboboxChipClassName = cn(
  badgeVariants({ variant: BadgeVariant.Secondary }),
  boundaryFocusRingGeometry,
  'focus-visible:ring-ring',
)

export const comboboxChipRemoveClassName = cn(
  badgeIconVariants(),
  'cursor-pointer',
)

const comboboxPanelAnimationClassName = cn(
  'data-[state=open]:animate-floating-anchored-enter',
  'data-[state=closed]:animate-floating-anchored-exit',
)

export const comboboxPanelClassName = cn(
  menuContent,
  'w-(--radix-popper-anchor-width) max-h-(--radix-popper-available-height) overflow-y-auto',
  'origin-(--radix-popper-transform-origin) outline-hidden',
  comboboxPanelAnimationClassName,
)

export const comboboxListClassName = 'outline-hidden'

export const comboboxItemClassName = cn('group', menuItem, menuItemHighlighted)

export const comboboxItemLabelClassName = 'min-w-0 flex-1 truncate'

export const comboboxItemDescriptionClassName = cn(
  'text-muted-foreground min-w-0 shrink truncate',
  'group-data-highlighted:text-neutral-600 dark:group-data-highlighted:text-neutral-300',
)

export const comboboxItemIconSlotClassName = menuItemIconSlot

export const comboboxItemIndicatorIconClassName = 'text-indicator size-4'

export const comboboxLabelClassName = menuLabel

export const comboboxSeparatorClassName = menuSeparator

export const comboboxEmptyClassName = menuLabel
