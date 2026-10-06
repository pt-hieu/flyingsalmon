import { useEffect, useRef } from 'react'

export interface OpenOnArrivalOptions {
  isOpen: boolean
  canOpen: boolean
  openMenu: () => void
}

// The state reducer vetoes opening while the panel has nothing to show, and
// downshift only opens in response to an event. A keystroke that found the
// panel empty therefore leaves a wish to open; content arriving later honours
// it unless Escape or blur has withdrawn it first.
export function useOpenOnArrival({
  isOpen,
  canOpen,
  openMenu,
}: OpenOnArrivalOptions) {
  const awaitingContentRef = useRef(false)

  useEffect(() => {
    if (isOpen) {
      awaitingContentRef.current = false
      return
    }

    if (awaitingContentRef.current && canOpen) {
      awaitingContentRef.current = false
      openMenu()
    }
  }, [isOpen, canOpen, openMenu])

  return {
    awaitContent() {
      if (!isOpen) {
        awaitingContentRef.current = true
      }
    },
    stopAwaitingContent() {
      awaitingContentRef.current = false
    },
  }
}
