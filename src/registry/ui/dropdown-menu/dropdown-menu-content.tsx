import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { PanelAlign, PanelSide } from '@/registry/lib/panel'

import { dropdownMenuContent } from './classnames'

export interface DropdownMenuContentProps extends Pick<
  React.ComponentProps<typeof DropdownMenuPrimitive.Content>,
  'className' | 'children'
> {
  side?: PanelSide
  align?: PanelAlign
}

export function DropdownMenuContent({
  side = PanelSide.Bottom,
  align = PanelAlign.Center,
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
