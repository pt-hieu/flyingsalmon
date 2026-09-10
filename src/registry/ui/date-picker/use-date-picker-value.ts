import { useState } from 'react'

import { toEntry } from './to-entry'
import { toValueKey } from './to-value-key'
import type { DatePickerEntry, DatePickerValue } from './types'

export interface UseDatePickerValueOptions {
  value?: DatePickerValue
  defaultValue?: DatePickerValue
}

export interface DatePickerValueState {
  committedValue: DatePickerValue
  entry: DatePickerEntry
  setEntry: (entry: DatePickerEntry) => void
  commit: (value: DatePickerValue) => void
}

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

  function commit(nextValue: DatePickerValue) {
    setOwnValue(nextValue)
    setEntry(toEntry(nextValue))
    setEntryKey(toValueKey(nextValue))
  }

  return { committedValue, entry, setEntry, commit }
}
