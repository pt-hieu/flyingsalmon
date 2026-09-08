export function stepFocusWithin(event: React.KeyboardEvent<HTMLElement>) {
  const focusableChildren = Array.from(event.currentTarget.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.hasAttribute('tabindex'),
  )
  const currentPosition = focusableChildren.indexOf(
    document.activeElement as HTMLElement,
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
