import { parseDate, type CalendarDate } from '@internationalized/date'

import {
  DatePickerMode,
  type DatePickerEntry,
  type DatePickerLimits,
  type DescribeRejectionOptions,
} from './types'
import { isCompleteDate } from './utils'

function isUnavailable(date: CalendarDate, limits: DatePickerLimits): boolean {
  if (limits.min !== undefined && date.compare(parseDate(limits.min)) < 0) {
    return true
  }

  if (limits.max !== undefined && date.compare(parseDate(limits.max)) > 0) {
    return true
  }

  return limits.isDateDisabled?.(date.toString()) === true
}

export function describeRejection(
  entry: DatePickerEntry,
  options: DescribeRejectionOptions,
): string | undefined {
  const { mode, unavailableMessage, rangeOrderMessage, ...limits } = options
  const { isBeingTyped } = entry

  if (mode === DatePickerMode.Range) {
    if (
      !isCompleteDate(entry.start, isBeingTyped) ||
      !isCompleteDate(entry.end, isBeingTyped)
    ) {
      return undefined
    }

    if (
      isUnavailable(entry.start, limits) ||
      isUnavailable(entry.end, limits)
    ) {
      return unavailableMessage
    }

    return entry.end.compare(entry.start) < 0 ? rangeOrderMessage : undefined
  }

  if (!isCompleteDate(entry.start, isBeingTyped)) {
    return undefined
  }

  return isUnavailable(entry.start, limits) ? unavailableMessage : undefined
}
