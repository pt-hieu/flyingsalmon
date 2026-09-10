import { useState } from 'react'

import { toEntry } from './to-entry'
import { toValueKey } from './to-value-key'
import type {
  DatePickerEntry,
  DatePickerValue,
  DatePickerValueState,
  UseDatePickerValueOptions,
} from './types'

export function useDatePickerValue({
  value,
  defaultValue,
}: UseDatePickerValueOptions): DatePickerValueState {
  const [ownValue, setOwnValue] = useState<DatePickerValue>(
    defaultValue ?? null,
  )
  const committedValue = value === undefined ? ownValue : value
  const committedKey = toValueKey(committedValue)

  const [entry, setEntry] = useState<DatePickerEntry>(() =>
    toEntry(committedValue),
  )
  const [entryKey, setEntryKey] = useState(committedKey)

  if (entryKey !== committedKey) {
    setEntryKey(committedKey)
    setEntry(toEntry(committedValue))
  }

  function rememberValue(nextValue: DatePickerValue) {
    setOwnValue(nextValue)
    setEntry(toEntry(nextValue))
    setEntryKey(toValueKey(nextValue))
  }

  return { committedValue, entry, setEntry, rememberValue }
}
