export enum SidebarLayout {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
  Strip = 'strip',
}

export interface SidebarState {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  layout: SidebarLayout
}

export interface SidebarSharedState extends SidebarState {
  sidebarId: string
  menuId: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  measured: boolean
}

export interface SidebarNestState {
  open: boolean
  setOpen: (open: boolean) => void
  itemsId: string
  hasActiveChild: boolean
  registerActiveChild: () => () => void
}

export interface SlottedItemProps {
  children?: React.ReactNode
  className?: string
  'data-slot'?: string
  'aria-current'?: React.AriaAttributes['aria-current']
}
