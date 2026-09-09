import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { dropdownMenuContent } from './classnames'
import { DropdownMenuAlign, DropdownMenuSide } from './types'

export interface DropdownMenuContentProps extends Pick<
  React.ComponentProps<typeof DropdownMenuPrimitive.Content>,
  'className' | 'children'
> {
  side?: DropdownMenuSide
  align?: DropdownMenuAlign
}

export function DropdownMenuContent({
  side = DropdownMenuSide.Bottom,
  align = DropdownMenuAlign.Center,
  className,
  children,
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        side={side}
        align={align}
        sideOffset={8}
        alignOffset={0}
        avoidCollisions
        collisionPadding={8}
        loop={false}
        className={cn(dropdownMenuContent, className)}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}
