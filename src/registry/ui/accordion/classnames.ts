import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  horizontalFocusRingClearance,
  insetFocusRingGeometry,
} from '@/registry/lib/interaction'

export const accordionRootClassName = 'flex w-full flex-col'

export const accordionItemClassName = cn(
  'border-border border-b',
  'transition-colors duration-(--motion-fast)',
  'has-[[data-slot=accordion-trigger]:hover]:border-primary',
)

export const accordionHeaderClassName = 'flex'

export const accordionTriggerClassName = cn(
  'group font-heading text-foreground flex w-full cursor-pointer items-start gap-4 py-4 text-base font-semibold',
  insetFocusRingGeometry,
  disabledInteraction,
)

export const accordionTriggerLabelClassName = 'flex-1 text-left'

export const accordionChevronBoxClassName = 'flex h-6 shrink-0 items-center'

export const accordionChevronClassName = cn(
  'text-muted-foreground size-4',
  'transition-[transform,color] [transition-duration:var(--motion-base),var(--motion-fast)]',
  'group-hover:text-foreground',
  'group-data-[state=open]:rotate-180',
)

export const accordionContentClassName = cn(
  'overflow-hidden text-sm',
  horizontalFocusRingClearance,
  'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
)

export const accordionContentBodyClassName = 'text-muted-foreground pb-4'
