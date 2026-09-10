import { useEffect, useRef } from 'react'

import type { ComboboxItemEntry } from './types'

export interface HighlightOnArrowOpenOptions {
  isOpen: boolean
  itemEntries: ComboboxItemEntry[]
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
}

function findFirstEnabledIndex(itemEntries: ComboboxItemEntry[]) {
  return itemEntries.findIndex((entry) => !entry.disabled)
}

function findLastEnabledIndex(itemEntries: ComboboxItemEntry[]) {
  for (let index = itemEntries.length - 1; index >= 0; index -= 1) {
    if (!itemEntries[index].disabled) {
      return index
    }
  }

  return -1
}

export function useHighlightOnArrowOpen({
  isOpen,
  itemEntries,
  highlightedIndex,
  setHighlightedIndex,
}: HighlightOnArrowOpenOptions) {
  const pendingEdgeRef = useRef<'first' | 'last' | null>(null)

  useEffect(() => {
    if (!isOpen) {
      pendingEdgeRef.current = null
      return
    }

    const pendingEdge = pendingEdgeRef.current

    if (pendingEdge === null || highlightedIndex >= 0) {
      return
    }

    const index =
      pendingEdge === 'first'
        ? findFirstEnabledIndex(itemEntries)
        : findLastEnabledIndex(itemEntries)

    if (index < 0) {
      return
    }

    pendingEdgeRef.current = null
    setHighlightedIndex(index)
  }, [isOpen, itemEntries, highlightedIndex, setHighlightedIndex])

  return function rememberArrowOpen(event: React.KeyboardEvent) {
    if (isOpen) {
      return
    }

    if (event.key === 'ArrowDown') {
      pendingEdgeRef.current = 'first'
    }

    if (event.key === 'ArrowUp') {
      pendingEdgeRef.current = 'last'
    }
  }
}
