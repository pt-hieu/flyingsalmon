import { Tooltip as TooltipPrimitive } from 'radix-ui'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={500} skipDelayDuration={300}>
      {children}
    </TooltipPrimitive.Provider>
  )
}
