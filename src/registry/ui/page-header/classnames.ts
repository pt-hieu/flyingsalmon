import { cn } from '@/lib/utils'

export const pageHeaderContainerClassName = '@container/page-header'

export const pageHeaderRowClassName = cn(
  'flex flex-col items-start gap-4',
  '@3xl/page-header:flex-row @3xl/page-header:items-center @3xl/page-header:justify-between',
)

export const pageHeaderTitleClassName = cn(
  'font-heading text-foreground min-w-0 text-4xl leading-tight font-extrabold tracking-tight text-balance',
  '@3xl/page-header:text-6xl',
)

export const pageHeaderActionsClassName = cn(
  'flex flex-wrap items-center gap-2',
  '@3xl/page-header:justify-end',
)
