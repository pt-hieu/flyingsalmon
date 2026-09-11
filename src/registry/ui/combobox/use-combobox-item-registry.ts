import { useCallback, useRef, useState } from 'react'

import type { ComboboxItemEntry } from './types'

export interface ComboboxItemRegistry {
  itemEntries: ComboboxItemEntry[]
  registerItem: (element: HTMLElement, entry: ComboboxItemEntry) => () => void
  labelForValue: (value: string) => string | undefined
}

function toDocumentOrder(elements: HTMLElement[]) {
  const ordered: HTMLElement[] = []

  for (const element of elements) {
    const firstElementAfter = ordered.findIndex(
      (placed) =>
        placed.compareDocumentPosition(element) &
        Node.DOCUMENT_POSITION_PRECEDING,
    )

    if (firstElementAfter < 0) {
      ordered.push(element)
    } else {
      ordered.splice(firstElementAfter, 0, element)
    }
  }

  return ordered
}

function areEntryListsEqual(
  left: ComboboxItemEntry[],
  right: ComboboxItemEntry[],
) {
  return (
    left.length === right.length &&
    left.every(
      (entry, index) =>
        entry.value === right[index].value &&
        entry.label === right[index].label &&
        entry.disabled === right[index].disabled,
    )
  )
}

export function useComboboxItemRegistry(): ComboboxItemRegistry {
  const [itemEntries, setItemEntries] = useState<ComboboxItemEntry[]>([])
  const entriesByElement = useRef(new Map<HTMLElement, ComboboxItemEntry>())
  const labelsByValue = useRef(new Map<string, string>())

  const rebuildEntries = useCallback(() => {
    const orderedEntries = toDocumentOrder([...entriesByElement.current.keys()])
      .map((element) => entriesByElement.current.get(element))
      .filter((entry) => entry !== undefined)

    setItemEntries((currentEntries) =>
      areEntryListsEqual(currentEntries, orderedEntries)
        ? currentEntries
        : orderedEntries,
    )
  }, [])

  const registerItem = useCallback(
    (element: HTMLElement, entry: ComboboxItemEntry) => {
      entriesByElement.current.set(element, entry)
      labelsByValue.current.set(entry.value, entry.label)
      rebuildEntries()

      return () => {
        entriesByElement.current.delete(element)
        rebuildEntries()
      }
    },
    [rebuildEntries],
  )

  const labelForValue = useCallback(
    (value: string) => labelsByValue.current.get(value),
    [],
  )

  return { itemEntries, registerItem, labelForValue }
}
