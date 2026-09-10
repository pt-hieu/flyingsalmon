import { parseDate } from '@internationalized/date'

import type { DatePickerEntry, DatePickerValue } from './types'

export function toEntry(value: DatePickerValue): DatePickerEntry {
  if (value === null) {
    return { start: null, end: null }
  }

  if (typeof value === 'string') {
    return { start: parseDate(value), end: null }
  }

  return { start: parseDate(value.start), end: parseDate(value.end) }
}
