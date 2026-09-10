import type { CalendarDate } from '@internationalized/date'

const shortestFourDigitYear = 1000

export function isCompleteDate(
  date: CalendarDate | null,
): date is CalendarDate {
  return date !== null && date.year >= shortestFourDigitYear
}
