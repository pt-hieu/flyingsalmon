import type { AvatarGroupItem } from './types'

export function resolveItemName(item: AvatarGroupItem) {
  return item.name || item.alt || ''
}

export function itemOffset({
  childIndex,
  revealedIndex,
}: {
  childIndex: number
  revealedIndex: number | null
}) {
  const revealSteps =
    revealedIndex === null ? 0 : Math.sign(childIndex - revealedIndex)

  return `calc(${revealSteps} * var(--avatar-group-reveal))`
}

export function childIndexContaining(
  parent: Element,
  target: EventTarget | null,
) {
  if (!(target instanceof Node)) return null

  const childIndex = Array.from(parent.children).findIndex((child) =>
    child.contains(target),
  )

  return childIndex === -1 ? null : childIndex
}
