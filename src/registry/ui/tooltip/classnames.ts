import { cn } from '@/lib/utils'

export const tooltipContentClassName = cn(
  'bg-foreground text-background z-50 max-w-64 rounded-md px-2.5 py-1.5 font-sans text-xs font-medium text-balance',
  'origin-(--radix-popper-transform-origin)',
  'data-[state=instant-open]:animate-floating-anchored-enter',
  'data-[state=delayed-open]:animate-floating-anchored-enter',
  'data-[state=closed]:animate-floating-anchored-exit',
)
