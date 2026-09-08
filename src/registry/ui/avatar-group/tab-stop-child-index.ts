import type { AvatarGroupRoster } from './types'

export function tabStopChildIndex({
  roster,
  focusedChildIndex,
}: {
  roster: AvatarGroupRoster
  focusedChildIndex: number | null
}) {
  const focusableChildIndexes = roster.visibleItems
    .map((visibleItem, childIndex) => (visibleItem.name ? childIndex : null))
    .filter((childIndex) => childIndex !== null)

  if (roster.chip) focusableChildIndexes.push(roster.visibleItems.length)

  if (
    focusedChildIndex !== null &&
    focusableChildIndexes.includes(focusedChildIndex)
  ) {
    return focusedChildIndex
  }

  return focusableChildIndexes[0] ?? null
}
