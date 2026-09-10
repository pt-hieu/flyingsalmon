import { cn } from '@/lib/utils'

export const sidebarProviderClassName = '@container'

export const sidebarShellClassName =
  'flex h-full w-full flex-col @min-[700px]:flex-row'

export const sidebarClassName = cn(
  'group/sidebar bg-background border-border sticky top-0 z-10 flex w-full shrink-0 flex-row items-center gap-3 border-b px-3 py-2',
  '@min-[700px]:static @min-[700px]:h-full @min-[700px]:w-(--sidebar-width) @min-[700px]:flex-col @min-[700px]:items-stretch @min-[700px]:gap-0 @min-[700px]:overflow-hidden @min-[700px]:border-r @min-[700px]:border-b-0 @min-[700px]:p-0',
  '@min-[700px]:data-[collapsed=true]:w-(--sidebar-width-collapsed)',
  '[--sidebar-width:18.125rem] [--sidebar-width-collapsed:3.5rem]',
)

export const sidebarHeaderClassName = cn(
  'flex shrink-0 items-center gap-2',
  '@min-[700px]:p-3',
  '@min-[700px]:group-data-[collapsed=true]/sidebar:w-(--sidebar-width-collapsed) @min-[700px]:group-data-[collapsed=true]/sidebar:justify-center @min-[700px]:group-data-[collapsed=true]/sidebar:px-0',
)

export const sidebarContentClassName = cn(
  'min-w-0 flex-1 overflow-x-auto',
  '@min-[700px]:overflow-x-hidden @min-[700px]:overflow-y-auto @min-[700px]:p-2',
  '@min-[700px]:group-data-[collapsed=true]/sidebar:w-(--sidebar-width-collapsed) @min-[700px]:group-data-[collapsed=true]/sidebar:px-0',
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
)

export const sidebarFooterClassName = cn(
  'flex shrink-0 items-center gap-2',
  '@min-[700px]:border-border @min-[700px]:mt-auto @min-[700px]:border-t @min-[700px]:p-3',
  '@min-[700px]:group-data-[collapsed=true]/sidebar:w-(--sidebar-width-collapsed) @min-[700px]:group-data-[collapsed=true]/sidebar:justify-center @min-[700px]:group-data-[collapsed=true]/sidebar:px-0',
)

export const sidebarNavClassName = cn(
  'flex flex-row items-center gap-1',
  '@min-[700px]:flex-col @min-[700px]:items-stretch',
)

export const sidebarGroupClassName = cn(
  'contents',
  '@min-[700px]:flex @min-[700px]:flex-col @min-[700px]:gap-1 @min-[700px]:py-2',
)

export const sidebarGroupLabelClassName = cn(
  'text-muted-foreground sr-only text-xs font-medium',
  '@min-[700px]:not-sr-only @min-[700px]:px-3 @min-[700px]:py-1',
  '@min-[700px]:transition-opacity @min-[700px]:duration-(--motion-fast)',
  '@min-[700px]:group-data-[collapsed=true]/sidebar:opacity-0',
)

export const sidebarItemClassName = cn(
  'group/sidebar-item relative flex h-9 shrink-0 cursor-pointer items-center gap-3 px-3 text-sm whitespace-nowrap',
  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
  'focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-hidden',
  'aria-[current=page]:text-foreground aria-[current=page]:font-medium',
  'transition-colors duration-(--motion-fast)',
  '@min-[700px]:w-full',
  '@min-[700px]:group-data-[collapsed=true]/sidebar:justify-center @min-[700px]:group-data-[collapsed=true]/sidebar:gap-0 @min-[700px]:group-data-[collapsed=true]/sidebar:px-2',
)

export const sidebarItemIconClassName = cn(
  'flex shrink-0 items-center [&_svg]:size-4',
  'transition-colors duration-(--motion-fast)',
  'group-aria-[current=page]/sidebar-item:text-indicator',
)

export const sidebarItemLabelClassName = cn(
  'overflow-hidden whitespace-nowrap',
  'transition-opacity duration-(--motion-fast)',
  '@min-[700px]:group-data-[collapsed=true]/sidebar:w-0 @min-[700px]:group-data-[collapsed=true]/sidebar:opacity-0',
)

export const sidebarActiveIndicatorClassName = cn(
  'bg-indicator absolute inset-x-1 bottom-0 h-0.5 rounded-full',
  '@min-[700px]:inset-x-auto @min-[700px]:inset-y-1 @min-[700px]:left-0 @min-[700px]:h-auto @min-[700px]:w-0.5',
)

export const sidebarTriggerClassName = '@min-[700px]:inline-flex hidden'
