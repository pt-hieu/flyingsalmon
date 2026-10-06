import { cn } from '@/lib/utils'

export const pageHeaderContainerClassName = cn(
  '@container/page-header border-border border-b',
  '-mx-(--page-header-inset) px-(--page-header-inset)',
)

export const pageHeaderRowClassName =
  'mx-auto flex max-w-(--page-header-max-width) flex-wrap items-start justify-between gap-x-4'

export const pageHeaderTitleClassName = cn(
  'font-heading text-foreground min-w-[min(100%,--spacing(64))] grow basis-0 text-4xl leading-10 font-extrabold tracking-tight text-balance',
  'py-[calc((var(--bar-height)_-_1lh)/2)]',
)

export const pageHeaderActionsClassName =
  'flex min-h-(--bar-height) flex-wrap items-center gap-2'
