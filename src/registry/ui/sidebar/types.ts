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
  /**
   * The ResizeObserver has not reported on the first render, so the sidebar
   * leaves its width to CSS until the container width is known.
   */
  measured: boolean
}

export interface SidebarSubmenuState {
  open: boolean
  setOpen: (open: boolean) => void
  itemsId: string
  hasActiveChild: boolean
  registerActiveChild: () => () => void
}
