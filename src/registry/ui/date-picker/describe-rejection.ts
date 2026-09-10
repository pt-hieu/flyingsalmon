import { parseDate, type CalendarDate } from '@internationalized/date'

import { isCompleteDate } from './is-complete-date'
import {
  DatePickerMode,
  type DatePickerEntry,
  type DatePickerLimits,
} from './types'

export interface RejectionMessages {
  unavailableMessage: string
  rangeOrderMessage: string
}

export interface DescribeRejectionOptions
  extends DatePickerLimits, RejectionMessages {
  mode: DatePickerMode
}

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

  if (mode === DatePickerMode.Range) {
    if (!isCompleteDate(entry.start) || !isCompleteDate(entry.end)) {
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

  if (!isCompleteDate(entry.start)) {
    return undefined
  }

  return isUnavailable(entry.start, limits) ? unavailableMessage : undefined
}
