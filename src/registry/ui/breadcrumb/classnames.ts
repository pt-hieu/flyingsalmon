import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const breadcrumbListClassName =
  'm-0 flex list-none flex-nowrap items-center gap-1.5 p-0 text-sm'

export const breadcrumbItemClassName = 'inline-flex shrink-0 items-center'

export const breadcrumbActiveItemClassName = 'min-w-0 shrink'

const breadcrumbInteractiveClassName = cn(
  'inline-flex shrink-0 items-center rounded-sm whitespace-nowrap',
  'text-muted-foreground hover:text-foreground active:text-foreground',
  'transition-colors duration-(--motion-fast)',
  'ring-ring',
  offsetFocusRingGeometry,
)

export const breadcrumbLinkClassName = cn(
  breadcrumbInteractiveClassName,
  'no-underline',
)

export const breadcrumbPageClassName =
  'text-foreground block max-w-[20ch] truncate font-normal'

export const breadcrumbSeparatorClassName =
  'text-muted-foreground inline-flex shrink-0 items-center'

export const breadcrumbSeparatorIconClassName = 'size-3.5 shrink-0'

export const breadcrumbEllipsisTriggerClassName = cn(
  breadcrumbInteractiveClassName,
  'cursor-pointer',
)

export const breadcrumbEllipsisIconClassName = 'size-4 shrink-0'
