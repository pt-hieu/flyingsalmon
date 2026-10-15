import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { menuLabel } from '@/registry/lib/menu'

export interface DropdownMenuLabelProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Label
> {}

export function DropdownMenuLabel({
  className,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(menuLabel, className)}
      {...props}
    />
  )
}
