import { parseDate } from '@internationalized/date'

import type { DatePickerEntry, DatePickerValue } from './types'

export function toEntry(value: DatePickerValue): DatePickerEntry {
  if (value === null) {
    return { start: null, end: null, isBeingTyped: false }
  }

  if (typeof value === 'string') {
    return { start: parseDate(value), end: null, isBeingTyped: false }
  }

  return {
    start: parseDate(value.start),
    end: parseDate(value.end),
    isBeingTyped: false,
  }
}
