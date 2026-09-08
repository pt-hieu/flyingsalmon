import { useState } from 'react'

function focusableElementsOf(group: HTMLElement) {
  return Array.from(group.querySelectorAll<HTMLElement>('[tabindex]'))
}

export function useRovingFocus(focusableCount: number) {
  const [focusedPosition, setFocusedPosition] = useState(0)

  const moveFocusTo = (group: HTMLElement, position: number) => {
    const focusableElements = focusableElementsOf(group)
    const clampedPosition = Math.min(
      Math.max(position, 0),
      focusableElements.length - 1,
    )
    const target = focusableElements[clampedPosition]

    if (!target) return

    setFocusedPosition(clampedPosition)
    target.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const group = event.currentTarget
    const currentPosition = focusableElementsOf(group).indexOf(
      document.activeElement as HTMLElement,
    )

    if (currentPosition === -1) return

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveFocusTo(group, currentPosition + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveFocusTo(group, currentPosition - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveFocusTo(group, 0)
    } else if (event.key === 'End') {
      event.preventDefault()
      moveFocusTo(group, Number.MAX_SAFE_INTEGER)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    const position = focusableElementsOf(event.currentTarget).indexOf(
      event.target,
    )

    if (position !== -1) setFocusedPosition(position)
  }

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return

    setFocusedPosition(0)
  }

  return {
    activePosition: Math.min(focusedPosition, focusableCount - 1),
    handleKeyDown,
    handleFocus,
    handleBlur,
  }
}
