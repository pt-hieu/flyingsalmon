import { type DateValue, toCalendarDate } from '@internationalized/date'

export function formatIsoDate(date: DateValue): string {
  return toCalendarDate(date).toString()
}
