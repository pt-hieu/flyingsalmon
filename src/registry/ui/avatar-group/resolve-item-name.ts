import type { AvatarGroupItem } from './types'

export function resolveItemName(item: AvatarGroupItem) {
  return item.name || item.alt || ''
}
