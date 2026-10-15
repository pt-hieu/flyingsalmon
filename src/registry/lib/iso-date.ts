import {
  type CalendarDate,
  type DateValue,
  parseDate,
  toCalendarDate,
} from '@internationalized/date'

export function formatIsoDate(date: DateValue): string {
  return toCalendarDate(date).toString()
}

export function parseOptionalIsoDate(
  isoDate: string | undefined,
): CalendarDate | undefined {
  return isoDate === undefined ? undefined : parseDate(isoDate)
}
