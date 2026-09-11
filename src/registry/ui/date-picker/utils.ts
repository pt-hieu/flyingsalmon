import { parseDate, type CalendarDate } from '@internationalized/date'

import type { DatePickerEntry, DatePickerValue } from './types'

const firstFourDigitYear = 1000

export function isCompleteDate(
  date: CalendarDate | null,
  isBeingTyped: boolean,
): date is CalendarDate {
  if (date === null) {
    return false
  }

  return !isBeingTyped || date.year >= firstFourDigitYear
}

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

export function toValueKey(value: DatePickerValue): string {
  if (value === null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return `${value.start}/${value.end}`
}
