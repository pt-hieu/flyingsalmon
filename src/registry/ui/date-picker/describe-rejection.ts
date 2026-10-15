import type { CalendarDate } from '@internationalized/date'

import { parseOptionalIsoDate } from '@/registry/lib/iso-date'

import {
  DatePickerMode,
  type DatePickerEntry,
  type DatePickerLimits,
  type DescribeRejectionOptions,
} from './types'
import { isCompleteDate } from './utils'

function isUnavailable(date: CalendarDate, limits: DatePickerLimits): boolean {
  const earliest = parseOptionalIsoDate(limits.min)
  if (earliest !== undefined && date.compare(earliest) < 0) {
    return true
  }

  const latest = parseOptionalIsoDate(limits.max)
  if (latest !== undefined && date.compare(latest) > 0) {
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
