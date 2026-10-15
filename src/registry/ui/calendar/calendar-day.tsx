import type { CalendarDate } from '@internationalized/date'
import { useContext } from 'react'
import { CalendarCell } from 'react-aria-components'

import {
  calendarCellFillVariants,
  calendarCellVariants,
  calendarTodayDashVariants,
} from './classnames'
import { CalendarAppearanceContext } from './context'
import { describeDay } from './utils'

export interface CalendarDayProps {
  date: CalendarDate
}

export function CalendarDay({ date }: CalendarDayProps) {
  const { mode, calendarDisabled } = useContext(CalendarAppearanceContext)

  return (
    <CalendarCell
      date={date}
      className={(cell) =>
        calendarCellVariants(describeDay(cell, mode, calendarDisabled))
      }
    >
      {(cell) => {
        const appearance = describeDay(cell, mode, calendarDisabled)

        return (
          <span className={calendarCellFillVariants(appearance)}>
            {cell.formattedDate}
            {appearance.today ? (
              <span
                aria-hidden
                className={calendarTodayDashVariants({
                  filled: appearance.filled,
                })}
              />
            ) : null}
          </span>
        )
      }}
    </CalendarCell>
  )
}
