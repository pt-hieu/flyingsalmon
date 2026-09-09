import {
  type CalendarDate,
  type DateValue,
  parseDate,
  toCalendarDate,
} from '@internationalized/date'

export function parseIsoDate(value: string): CalendarDate {
  return parseDate(value)
}

export function formatIsoDate(date: DateValue): string {
  return toCalendarDate(date).toString()
}
