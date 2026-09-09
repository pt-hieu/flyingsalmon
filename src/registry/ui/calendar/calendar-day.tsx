import type { CalendarDate } from '@internationalized/date'
import { CalendarCell } from 'react-aria-components'

import {
  calendarCellFillVariants,
  calendarCellVariants,
  calendarTodayDotVariants,
} from './classnames'
import { describeDay } from './describe-day'
import type { CalendarMode } from './types'

export interface CalendarDayProps {
  date: CalendarDate
  mode: CalendarMode
  calendarDisabled: boolean
}

export function CalendarDay({
  date,
  mode,
  calendarDisabled,
}: CalendarDayProps) {
  return (
    <CalendarCell
      date={date}
      className={(cell) => {
        const {
          hidden,
          unavailable,
          interior,
          bandStart,
          bandEnd,
          highlighted,
        } = describeDay(cell, mode, calendarDisabled)
        return calendarCellVariants({
          hidden,
          unavailable,
          interior,
          bandStart,
          bandEnd,
          highlighted,
        })
      }}
    >
      {(cell) => {
        const { filled, highlighted, today } = describeDay(
          cell,
          mode,
          calendarDisabled,
        )
        return (
          <span className={calendarCellFillVariants({ filled, highlighted })}>
            {cell.formattedDate}
            {today ? (
              <span
                aria-hidden
                className={calendarTodayDotVariants({ filled })}
              />
            ) : null}
          </span>
        )
      }}
    </CalendarCell>
  )
}
