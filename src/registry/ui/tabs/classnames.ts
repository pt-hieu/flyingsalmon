import { cn } from '@/lib/utils'

export const tabsListClassName = 'border-border flex gap-1 border-b pb-2'

export const tabsTriggerClassName = cn(
  'relative inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium whitespace-nowrap',
  'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground',
  'transition-colors duration-(--motion-fast)',
  'focus-visible:outline-hidden',
  'disabled:pointer-events-none disabled:opacity-50',
)

export const tabsActiveIndicatorClassName =
  'bg-indicator absolute inset-x-0 -bottom-2 h-0.5 rounded-full'

export const tabsFocusIndicatorClassName =
  'bg-ring absolute inset-x-0 -bottom-2 h-px rounded-full'
