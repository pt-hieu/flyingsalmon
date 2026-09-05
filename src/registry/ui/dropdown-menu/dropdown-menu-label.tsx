import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { dropdownMenuLabel } from './classnames'

export function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(dropdownMenuLabel, className)}
      {...props}
    />
  )
}
