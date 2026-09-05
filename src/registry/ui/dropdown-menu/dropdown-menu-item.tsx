import { DropdownMenu as DropdownMenuPrimitive, Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import {
  dropdownMenuItemIconSlot,
  dropdownMenuItemVariants,
} from './classnames'
import { DropdownMenuItemVariant } from './types'

export interface DropdownMenuItemProps extends Omit<
  React.ComponentProps<typeof DropdownMenuPrimitive.Item>,
  'asChild'
> {
  variant?: DropdownMenuItemVariant
  icon?: React.ReactNode
  asChild?: boolean
}

export function DropdownMenuItem({
  variant = DropdownMenuItemVariant.Default,
  icon,
  asChild = false,
  className,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      asChild={asChild}
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    >
      {icon ? (
        <span key="icon" aria-hidden className={dropdownMenuItemIconSlot}>
          {icon}
        </span>
      ) : null}
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
    </DropdownMenuPrimitive.Item>
  )
}
