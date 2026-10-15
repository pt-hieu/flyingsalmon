import { useEffect, useRef } from 'react'

export interface OpenOnArrivalOptions {
  isOpen: boolean
  canOpen: boolean
  openMenu: () => void
}

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
