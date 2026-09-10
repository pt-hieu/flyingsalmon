import type { UseComboboxReturnValue } from 'downshift'

export enum ComboboxMode {
  Single = 'single',
  Multiple = 'multiple',
}

export enum ComboboxSize {
  Default = 'default',
  Small = 'sm',
}

export enum ComboboxPanelSide {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum ComboboxPanelAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum ComboboxHighlightEdge {
  First = 'first',
  Last = 'last',
}

export interface ComboboxItemEntry {
  value: string
  label: string
  disabled: boolean
}

export interface ComboboxSharedState {
  mode: ComboboxMode
  itemEntries: ComboboxItemEntry[]
  highlightedIndex: number
  selectedValues: string[]
  registerItem: (element: HTMLElement, entry: ComboboxItemEntry) => () => void
  pickEntry: (entry: ComboboxItemEntry) => void
  getItemProps: UseComboboxReturnValue<ComboboxItemEntry>['getItemProps']
}
