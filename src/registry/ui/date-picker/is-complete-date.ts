import type { CalendarDate } from '@internationalized/date'

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
