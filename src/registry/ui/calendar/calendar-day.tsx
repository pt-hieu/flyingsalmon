import type { CalendarDate } from '@internationalized/date'
import { useContext } from 'react'
import { CalendarCell } from 'react-aria-components'

import { cn } from '@/lib/utils'

import {
  calendarCellFillVariants,
  calendarCellVariants,
  calendarTodayDotVariants,
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
      className={(cell) => {
        const {
          hidden,
          unavailable,
          filled,
          interior,
          bandStart,
          bandEnd,
          highlighted,
        } = describeDay(cell, mode, calendarDisabled)
        return cn(
          calendarCellVariants({
            hidden,
            unavailable,
            filled,
            interior,
            bandStart,
            bandEnd,
            highlighted,
          }),
        )
      }}
    >
      {(cell) => {
        const { filled, interior, bandStart, bandEnd, highlighted, today } =
          describeDay(cell, mode, calendarDisabled)
        return (
          <span
            className={cn(
              calendarCellFillVariants({
                filled,
                interior,
                bandStart,
                bandEnd,
                highlighted,
              }),
            )}
          >
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
