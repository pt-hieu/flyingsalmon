import type { AvatarProps } from '../avatar'

export type AvatarGroupItem = Pick<
  AvatarProps,
  'name' | 'src' | 'color' | 'alt'
> & {
  id?: string
}

export interface AvatarGroupVisibleItem {
  item: AvatarGroupItem
  name: string
  key: string | number
  layer: number
}

export interface AvatarGroupChip {
  count: number
  text: string
  hiddenNames: string
}

export interface AvatarGroupRoster {
  visibleItems: AvatarGroupVisibleItem[]
  chip: AvatarGroupChip | null
}
