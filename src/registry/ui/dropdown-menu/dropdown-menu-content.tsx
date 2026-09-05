import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import { use } from 'react'

import { cn } from '@/lib/utils'
import { dropdownMenuContent } from './classnames'
import { DropdownMenuExhibitionContext } from './context'
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
  const exhibitionMode = use(DropdownMenuExhibitionContext)

  const content = (
    <DropdownMenuPrimitive.Content
      side={side}
      align={align}
      sideOffset={8}
      alignOffset={0}
      avoidCollisions
      collisionPadding={8}
      loop={false}
      onFocusOutside={
        exhibitionMode ? (event) => event.preventDefault() : undefined
      }
      className={cn(dropdownMenuContent, className)}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  )

  if (exhibitionMode) return content

  return <DropdownMenuPrimitive.Portal>{content}</DropdownMenuPrimitive.Portal>
}
