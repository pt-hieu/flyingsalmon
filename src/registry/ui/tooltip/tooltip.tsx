import { Tooltip as TooltipPrimitive } from 'radix-ui'

import { tooltipContentClassName } from './classnames'
import { TooltipAlign, TooltipSide } from './types'

export interface TooltipProps extends Omit<
  React.ComponentProps<typeof TooltipPrimitive.Root>,
  'children' | 'delayDuration' | 'disableHoverableContent'
> {
  content: string
  side?: TooltipSide
  align?: TooltipAlign
  children: React.ReactElement
}

export function Tooltip({
  content,
  side = TooltipSide.Top,
  align = TooltipAlign.Center,
  children,
  ...rootProps
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          alignOffset={0}
          avoidCollisions
          collisionPadding={8}
          className={tooltipContentClassName}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
