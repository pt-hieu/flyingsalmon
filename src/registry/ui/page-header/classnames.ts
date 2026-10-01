import { cn } from '@/lib/utils'

export const pageHeaderContainerClassName = cn(
  '@container/page-header border-border border-b pb-6',
  '-mx-(--page-header-inset) px-(--page-header-inset)',
)

export const pageHeaderRowClassName = cn(
  'flex flex-col items-start gap-4',
  '@3xl/page-header:flex-row @3xl/page-header:justify-between',
)

export const pageHeaderTitleClassName = cn(
  'font-heading text-foreground min-w-0 text-4xl leading-10 font-extrabold tracking-tight text-balance',
  'pt-[calc((var(--bar-height)_-_1lh)/2)]',
  '@3xl/page-header:text-6xl @3xl/page-header:leading-18',
)

export const pageHeaderActionsClassName = cn(
  'flex flex-wrap items-center gap-2',
  '@3xl/page-header:min-h-(--bar-height) @3xl/page-header:justify-end',
)
