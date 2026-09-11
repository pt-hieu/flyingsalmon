import {
  DatePickerMode,
  type DatePickerEntry,
  type DatePickerValue,
} from './types'
import { isCompleteDate } from './utils'

export function readEntryValue(
  entry: DatePickerEntry,
  mode: DatePickerMode,
): DatePickerValue {
  const { isBeingTyped } = entry

  if (mode === DatePickerMode.Range) {
    if (
      !isCompleteDate(entry.start, isBeingTyped) ||
      !isCompleteDate(entry.end, isBeingTyped)
    ) {
      return null
    }
    return { start: entry.start.toString(), end: entry.end.toString() }
  }

  return isCompleteDate(entry.start, isBeingTyped)
    ? entry.start.toString()
    : null
}
