import { isCompleteDate } from './is-complete-date'
import {
  DatePickerMode,
  type DatePickerEntry,
  type DatePickerValue,
} from './types'

export function readEntryValue(
  entry: DatePickerEntry,
  mode: DatePickerMode,
): DatePickerValue {
  if (mode === DatePickerMode.Range) {
    if (!isCompleteDate(entry.start) || !isCompleteDate(entry.end)) {
      return null
    }
    return { start: entry.start.toString(), end: entry.end.toString() }
  }

  return isCompleteDate(entry.start) ? entry.start.toString() : null
}
