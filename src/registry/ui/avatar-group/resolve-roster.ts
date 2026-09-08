import { resolveItemName } from './resolve-item-name'
import type { AvatarGroupItem, AvatarGroupRoster } from './types'

export function resolveRoster({
  items,
  max,
  cap,
}: {
  items: AvatarGroupItem[]
  max: number
  cap?: number
}): AvatarGroupRoster {
  const visibleLimit = Math.max(1, max)
  const hiddenItems = items.slice(visibleLimit)
  const hiddenCount = hiddenItems.length

  const visibleItems = items
    .slice(0, visibleLimit)
    .map((item, index, shownItems) => {
      const name = resolveItemName(item)

      return {
        item,
        name,
        key: item.id ?? index,
        layer: shownItems.length - index,
      }
    })

  const chip =
    hiddenCount === 0
      ? null
      : {
          count: hiddenCount,
          text: `+${cap === undefined ? hiddenCount : Math.min(hiddenCount, cap)}`,
          hiddenNames: hiddenItems
            .map(resolveItemName)
            .filter(Boolean)
            .join(', '),
        }

  return { visibleItems, chip }
}
