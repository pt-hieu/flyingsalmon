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
  exhibitionMode?: boolean
  children: React.ReactElement
}

export function Tooltip({
  content,
  side = TooltipSide.Top,
  align = TooltipAlign.Center,
  exhibitionMode = false,
  children,
  open,
  ...rootProps
}: TooltipProps) {
  const tooltipContent = (
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
  )

  const tooltipRoot = (
    <TooltipPrimitive.Root {...rootProps} open={exhibitionMode ? true : open}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      {exhibitionMode ? (
        tooltipContent
      ) : (
        <TooltipPrimitive.Portal>{tooltipContent}</TooltipPrimitive.Portal>
      )}
    </TooltipPrimitive.Root>
  )

  if (exhibitionMode) {
    return <TooltipPrimitive.Provider>{tooltipRoot}</TooltipPrimitive.Provider>
  }

  return tooltipRoot
}
