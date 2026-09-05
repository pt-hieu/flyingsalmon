import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  menuContent,
  menuItem,
  menuItemDestructive,
  menuItemHighlighted,
  menuItemIconSlot,
  menuLabel,
  menuSeparator,
} from '@/registry/lib/menu'
import { DropdownMenuItemVariant } from './types'

export const dropdownMenuContent = cn(
  menuContent,
  'min-w-57 outline-hidden',
  'max-h-(--radix-dropdown-menu-content-available-height) overflow-y-auto',
  'origin-(--radix-popper-transform-origin)',
  'data-[state=open]:animate-floating-anchored-enter',
  'data-[state=closed]:animate-floating-anchored-exit',
)

export const dropdownMenuLabel = menuLabel

export const dropdownMenuSeparator = menuSeparator

export const dropdownMenuShortcut =
  'text-muted-foreground group-data-highlighted:text-inherit ml-auto text-xs tracking-widest'

export const dropdownMenuItemVariants = cva(
  cn(menuItem, 'group -mx-1 rounded-none px-3', menuItemHighlighted),
  {
    variants: {
      variant: {
        [DropdownMenuItemVariant.Default]: '',
        [DropdownMenuItemVariant.Destructive]: menuItemDestructive,
      },
    },
    defaultVariants: {
      variant: DropdownMenuItemVariant.Default,
    },
  },
)

export const dropdownMenuItemIconSlot = cn(menuItemIconSlot, '[&>svg]:size-4')
