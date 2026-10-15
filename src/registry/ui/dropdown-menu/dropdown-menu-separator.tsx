import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { menuSeparator } from '@/registry/lib/menu'

export interface DropdownMenuSeparatorProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Separator
> {}

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(menuSeparator, className)}
      {...props}
    />
  )
}
