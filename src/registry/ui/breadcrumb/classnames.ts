import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const breadcrumbListClassName = cn(
  'text-muted-foreground m-0 flex list-none flex-nowrap items-center gap-1.5 p-0 text-sm',
)

export const breadcrumbItemClassName = cn(
  'inline-flex shrink-0 items-center',
  'has-[[aria-current=page]]:min-w-0 has-[[aria-current=page]]:shrink',
)

export const breadcrumbLinkClassName = cn(
  'inline-flex shrink-0 cursor-pointer items-center rounded-sm whitespace-nowrap no-underline',
  'text-muted-foreground hover:text-foreground active:text-foreground',
  'transition-colors duration-(--motion-fast)',
  'ring-ring',
  offsetFocusRingGeometry,
)

export const breadcrumbPageClassName =
  'text-foreground block max-w-[20ch] truncate font-normal'

export const breadcrumbSeparatorClassName = 'inline-flex shrink-0 items-center'

export const breadcrumbSeparatorIconClassName = 'size-3.5 shrink-0'

export const breadcrumbEllipsisTriggerClassName = breadcrumbLinkClassName

export const breadcrumbEllipsisIconClassName = 'size-4 shrink-0'
