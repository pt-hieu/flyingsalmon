import { type DateValue, toCalendarDate } from '@internationalized/date'
import type { CalendarCellRenderProps } from 'react-aria-components'

import { CalendarMode, type DayAppearance } from './types'

export function formatIsoDate(date: DateValue): string {
  return toCalendarDate(date).toString()
}

export function describeDay(
  cell: CalendarCellRenderProps,
  mode: CalendarMode,
  calendarDisabled: boolean,
): DayAppearance {
  const isRange = mode === CalendarMode.Range
  const filled = isRange
    ? cell.isSelectionStart || cell.isSelectionEnd
    : cell.isSelected

  return {
    hidden: cell.isOutsideMonth,
    unavailable:
      cell.isUnavailable ||
      (cell.isDisabled && !calendarDisabled && !cell.isOutsideMonth),
    filled,
    interior: isRange && cell.isSelected && !filled,
    bandStart: isRange && cell.isSelectionStart && !cell.isSelectionEnd,
    bandEnd: isRange && cell.isSelectionEnd && !cell.isSelectionStart,
    highlighted: cell.isHovered || cell.isFocusVisible,
    today: cell.isToday,
  }
}
