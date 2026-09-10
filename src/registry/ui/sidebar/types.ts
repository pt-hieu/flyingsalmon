export enum SidebarLayout {
  Expanded = 'expanded',
  Rail = 'rail',
  Strip = 'strip',
}

export interface SidebarState {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  layout: SidebarLayout
  sidebarId: string
}
