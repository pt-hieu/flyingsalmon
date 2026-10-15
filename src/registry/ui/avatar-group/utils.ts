import type { AvatarGroupItem, AvatarGroupRoster } from './types'

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

export function stepFocusWithin(event: React.KeyboardEvent<HTMLElement>) {
  const focusableChildren = Array.from(event.currentTarget.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.hasAttribute('tabindex'),
  )
  const { activeElement } = event.currentTarget.ownerDocument
  const currentPosition = focusableChildren.findIndex(
    (child) => child === activeElement,
  )

  if (currentPosition === -1) return

  const targets: Record<string, HTMLElement | undefined> = {
    ArrowRight: focusableChildren[currentPosition + 1],
    ArrowLeft: focusableChildren[currentPosition - 1],
    Home: focusableChildren[0],
    End: focusableChildren.at(-1),
  }

  if (!(event.key in targets)) return

  event.preventDefault()
  targets[event.key]?.focus()
}
