import { cn } from '@/lib/utils'

export const sidebarShellClassName =
  'flex h-full w-full flex-col min-[700px]:flex-row'

export const sidebarClassName = cn(
  'group/sidebar bg-background border-border sticky top-0 z-10 flex h-(--bar-height) w-full shrink-0 flex-row items-center gap-3 border-b px-[max(--spacing(3),var(--page-header-inset))]',
  'min-[700px]:static min-[700px]:h-full min-[700px]:w-(--sidebar-width) min-[700px]:flex-col min-[700px]:items-stretch min-[700px]:gap-0 min-[700px]:overflow-hidden min-[700px]:border-r min-[700px]:border-b-0 min-[700px]:px-0',
  'min-[700px]:data-[collapsed=true]:w-(--sidebar-width-collapsed)',
  'max-[700px]:[&:not(:has([data-slot=sidebar-footer]))_[data-slot=sidebar-trigger]]:ml-auto',
  '[--sidebar-width:18.125rem] [--sidebar-width-collapsed:3.5rem]',
)

export const sidebarHeaderClassName = cn(
  'flex shrink-0 items-center gap-2 max-[700px]:contents',
  'min-[700px]:h-(--bar-height) min-[700px]:px-2.5',
)

export const sidebarContentClassName = cn(
  'min-h-0 flex-1 overflow-x-hidden overflow-y-auto p-2',
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
)

export const sidebarInlineContentClassName = 'max-[700px]:hidden'

export const sidebarMenuClassName = 'group/sidebar'

export const sidebarMenuTitleClassName =
  'font-heading shrink-0 px-5 pt-(--dialog-spacing) text-lg font-semibold'

export const sidebarFooterClassName = cn(
  'flex shrink-0 items-center gap-2',
  'max-[700px]:ml-auto max-[700px]:order-1',
  'min-[700px]:border-border min-[700px]:mt-auto min-[700px]:border-t min-[700px]:px-2.5 min-[700px]:py-3',
)

export const sidebarNavClassName = 'flex flex-col gap-1'

export const sidebarGroupClassName = 'flex flex-col gap-1 py-2'

export const sidebarGroupLabelClassName = cn(
  'relative overflow-hidden px-3 py-1',
  'after:bg-border after:absolute after:inset-x-0 after:top-1.5 after:h-px after:opacity-0',
  'after:transition-opacity after:duration-(--motion-fast)',
  'group-data-[collapsed=true]/sidebar:after:opacity-100',
)

export const sidebarGroupLabelTextClassName = cn(
  'text-muted-foreground block truncate text-xs font-medium',
  'transition-opacity duration-(--motion-fast)',
  'group-data-[collapsed=true]/sidebar:opacity-0',
)

export const sidebarItemClassName = cn(
  'group/sidebar-item relative flex h-9 shrink-0 cursor-pointer items-center gap-3 rounded-md px-3 text-sm whitespace-nowrap',
  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
  'group-hover/sidebar-row:bg-accent group-hover/sidebar-row:text-accent-foreground',
  'group-has-[[data-slot=sidebar-nest-toggle]:focus-visible]/sidebar-row:bg-accent group-has-[[data-slot=sidebar-nest-toggle]:focus-visible]/sidebar-row:text-accent-foreground',
  'focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-hidden',
  'aria-[current=page]:text-foreground aria-[current=page]:font-medium',
  'transition-colors duration-(--motion-fast)',
  'w-full',
)

export const sidebarItemIconClassName = cn(
  'flex shrink-0 items-center [&_svg]:size-4',
  'transition-[color,opacity] duration-(--motion-fast)',
  'group-aria-[current=page]/sidebar-item:text-indicator',
  'group-data-[collapsed=true]/sidebar:group-hover/sidebar-row:opacity-0',
  'group-data-[collapsed=true]/sidebar:group-has-[[data-slot=sidebar-nest-toggle]:focus-visible]/sidebar-row:opacity-0',
)

export const sidebarItemLabelClassName = cn(
  'min-w-0 truncate',
  'transition-opacity duration-(--motion-fast)',
  'group-data-[collapsed=true]/sidebar:opacity-0',
)

export const sidebarActiveIndicatorClassName =
  'bg-indicator absolute inset-y-1.5 -left-2 w-0.5 rounded-full'

export const sidebarNestClassName = cn(
  'group/sidebar-nest rounded-md',
  'transition-colors duration-(--motion-fast)',
  'group-data-[collapsed=true]/sidebar:data-[state=open]:bg-muted',
)

export const sidebarNestRowClassName =
  'group/sidebar-row relative flex w-full shrink-0 flex-col'

export const sidebarNestParentItemClassName =
  'group-data-[collapsed=false]/sidebar:pr-9'

export const sidebarNestChildItemClassName = cn(
  'mt-1',
  'group-data-[collapsed=false]/sidebar:mr-6.5 group-data-[collapsed=false]/sidebar:w-auto',
  'after:bg-border after:absolute after:-top-1 after:-right-2 after:bottom-0 after:w-px',
  'first:after:top-0',
  'after:transition-opacity after:duration-(--motion-fast)',
  'group-data-[collapsed=true]/sidebar:after:opacity-0',
)

export const sidebarNestToggleClassName = cn(
  'group/sidebar-toggle text-muted-foreground absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center',
  'focus-visible:outline-hidden',
  'group-data-[collapsed=true]/sidebar:inset-0 group-data-[collapsed=true]/sidebar:w-auto',
)

export const sidebarNestChevronClassName = cn(
  'size-4',
  'transition-[transform,opacity] [transition-duration:var(--motion-base),var(--motion-fast)]',
  'group-data-[state=open]/sidebar-nest:rotate-90',
  'group-data-[collapsed=true]/sidebar:opacity-0',
  'group-data-[collapsed=true]/sidebar:group-hover/sidebar-row:opacity-100',
  'group-data-[collapsed=true]/sidebar:group-focus-visible/sidebar-toggle:opacity-100',
)

export const sidebarNestItemsClassName =
  '-mx-2 flex flex-col items-stretch overflow-hidden px-2'

export const sidebarTriggerClassName = 'max-[700px]:order-2'
