import { cn } from '@/lib/utils'

export const sidebarShellClassName =
  'flex h-full w-full flex-col min-[700px]:flex-row'

export const sidebarClassName = cn(
  'group/sidebar bg-background border-border sticky top-0 z-10 flex w-full shrink-0 flex-row items-center gap-3 border-b px-3',
  'min-[700px]:static min-[700px]:h-full min-[700px]:w-(--sidebar-width) min-[700px]:flex-col min-[700px]:items-stretch min-[700px]:gap-0 min-[700px]:overflow-hidden min-[700px]:border-r min-[700px]:border-b-0 min-[700px]:px-0',
  'min-[700px]:data-[collapsed=true]:w-(--sidebar-width-collapsed)',
  '[--sidebar-width:18.125rem] [--sidebar-width-collapsed:3.5rem]',
)

export const sidebarHeaderClassName = cn(
  'flex shrink-0 items-center gap-2',
  'min-[700px]:px-2.5 min-[700px]:py-3',
)

export const sidebarContentClassName = cn(
  'min-w-0 flex-1 overflow-x-auto py-2',
  'min-[700px]:overflow-x-hidden min-[700px]:overflow-y-auto min-[700px]:p-2',
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
)

export const sidebarFooterClassName = cn(
  'flex shrink-0 items-center gap-2',
  'min-[700px]:border-border min-[700px]:mt-auto min-[700px]:border-t min-[700px]:px-2.5 min-[700px]:py-3',
)

export const sidebarNavClassName = cn(
  'flex flex-row items-center gap-1',
  'min-[700px]:flex-col min-[700px]:items-stretch',
)

export const sidebarGroupClassName = cn(
  'contents',
  'min-[700px]:flex min-[700px]:flex-col min-[700px]:gap-1 min-[700px]:py-2',
)

export const sidebarGroupLabelClassName = cn(
  'sr-only',
  'min-[700px]:not-sr-only min-[700px]:relative min-[700px]:overflow-hidden min-[700px]:px-3 min-[700px]:py-1',
  'min-[700px]:after:bg-border min-[700px]:after:absolute min-[700px]:after:inset-x-0 min-[700px]:after:top-1.5 min-[700px]:after:h-px min-[700px]:after:opacity-0',
  'min-[700px]:after:transition-opacity min-[700px]:after:duration-(--motion-fast)',
  'min-[700px]:group-data-[collapsed=true]/sidebar:after:opacity-100',
)

export const sidebarGroupLabelTextClassName = cn(
  'text-muted-foreground block text-xs font-medium whitespace-nowrap',
  'transition-opacity duration-(--motion-fast)',
  'min-[700px]:group-data-[collapsed=true]/sidebar:opacity-0',
)

export const sidebarItemClassName = cn(
  'group/sidebar-item relative flex h-9 shrink-0 cursor-pointer items-center gap-3 rounded-md px-3 text-sm whitespace-nowrap',
  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
  'group-hover/sidebar-row:bg-accent group-hover/sidebar-row:text-accent-foreground',
  'focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-hidden',
  'aria-[current=page]:text-foreground aria-[current=page]:font-medium',
  'transition-colors duration-(--motion-fast)',
  'min-[700px]:w-full',
)

export const sidebarItemIconClassName = cn(
  'flex shrink-0 items-center [&_svg]:size-4',
  'transition-[color,opacity] duration-(--motion-fast)',
  'group-aria-[current=page]/sidebar-item:text-indicator',
  'min-[700px]:group-data-[collapsed=true]/sidebar:group-hover/sidebar-row:opacity-0',
  'min-[700px]:group-data-[collapsed=true]/sidebar:group-has-[[data-slot=sidebar-submenu-toggle]:focus-visible]/sidebar-row:opacity-0',
)

export const sidebarItemLabelClassName = cn(
  'min-w-0 overflow-hidden whitespace-nowrap',
  'transition-opacity duration-(--motion-fast)',
  'min-[700px]:group-data-[collapsed=true]/sidebar:opacity-0',
)

export const sidebarActiveIndicatorClassName = cn(
  'bg-indicator absolute inset-x-2 -bottom-2 h-0.5 rounded-full',
  'min-[700px]:inset-x-auto min-[700px]:inset-y-1.5 min-[700px]:-left-2 min-[700px]:h-auto min-[700px]:w-0.5',
)

export const sidebarTriggerClassName = 'min-[700px]:inline-flex hidden'

export const sidebarSubmenuClassName = cn(
  'group/sidebar-submenu rounded-md',
  'transition-colors duration-(--motion-fast)',
  'max-[700px]:bg-muted max-[700px]:flex max-[700px]:flex-row max-[700px]:items-center max-[700px]:gap-1',
  'min-[700px]:group-data-[collapsed=true]/sidebar:data-[state=open]:bg-muted',
)

export const sidebarSubmenuRowClassName =
  'group/sidebar-row relative flex shrink-0 flex-col min-[700px]:w-full'

export const sidebarSubmenuParentItemClassName =
  'min-[700px]:group-data-[collapsed=false]/sidebar:pr-9'

export const sidebarSubmenuChildItemClassName = cn(
  'min-[700px]:mt-1',
  'min-[700px]:group-data-[collapsed=false]/sidebar:mr-6.5 min-[700px]:group-data-[collapsed=false]/sidebar:w-auto',
  'min-[700px]:after:bg-border min-[700px]:after:absolute min-[700px]:after:-top-1 min-[700px]:after:-right-2 min-[700px]:after:bottom-0 min-[700px]:after:w-px',
  'min-[700px]:first:after:top-0',
  'min-[700px]:after:transition-opacity min-[700px]:after:duration-(--motion-fast)',
  'min-[700px]:group-data-[collapsed=true]/sidebar:after:opacity-0',
)

export const sidebarSubmenuToggleClassName = cn(
  'group/sidebar-toggle text-muted-foreground absolute inset-y-0 right-0 hidden w-9 cursor-pointer items-center justify-center',
  'hover:text-indicator focus-visible:text-indicator focus-visible:outline-hidden',
  'transition-colors duration-(--motion-fast)',
  'min-[700px]:flex',
  'min-[700px]:group-data-[collapsed=true]/sidebar:inset-0 min-[700px]:group-data-[collapsed=true]/sidebar:w-auto',
)

export const sidebarSubmenuChevronClassName = cn(
  'size-4',
  'transition-[transform,opacity] [transition-duration:var(--motion-base),var(--motion-fast)]',
  'group-data-[state=open]/sidebar-submenu:rotate-90',
  'min-[700px]:group-data-[collapsed=true]/sidebar:opacity-0',
  'min-[700px]:group-data-[collapsed=true]/sidebar:group-hover/sidebar-row:opacity-100',
  'min-[700px]:group-data-[collapsed=true]/sidebar:group-focus-visible/sidebar-toggle:opacity-100',
)

export const sidebarSubmenuItemsClassName = cn(
  '-mx-2 flex flex-row items-center gap-1 px-2',
  'max-[700px]:-my-2 max-[700px]:py-2',
  'min-[700px]:flex-col min-[700px]:items-stretch min-[700px]:gap-0 min-[700px]:overflow-hidden',
)
