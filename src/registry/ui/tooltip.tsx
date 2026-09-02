import { Tooltip as TooltipPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'center' | 'end'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={500} skipDelayDuration={300}>
      {children}
    </TooltipPrimitive.Provider>
  )
}

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
  side = 'top',
  align = 'center',
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
      className={cn(
        'bg-foreground text-background z-50 max-w-64 rounded-md px-2.5 py-1.5 font-sans text-xs font-medium text-balance',
        'origin-(--radix-popper-transform-origin)',
        'data-[state=instant-open]:animate-floating-anchored-enter',
        'data-[state=delayed-open]:animate-floating-anchored-enter',
        'data-[state=closed]:animate-floating-anchored-exit',
      )}
    >
      {content}
    </TooltipPrimitive.Content>
  )

  return (
    <TooltipPrimitive.Root {...rootProps} open={exhibitionMode ? true : open}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      {exhibitionMode ? (
        tooltipContent
      ) : (
        <TooltipPrimitive.Portal>{tooltipContent}</TooltipPrimitive.Portal>
      )}
    </TooltipPrimitive.Root>
  )
}
