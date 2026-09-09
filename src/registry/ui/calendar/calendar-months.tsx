import { useContext } from 'react'
import {
  CalendarStateContext,
  RangeCalendarStateContext,
} from 'react-aria-components'

import { CalendarMonth } from './calendar-month'
import { usePageDirection } from './use-page-direction'

export interface CalendarMonthsProps {
  months: number
}

export function CalendarMonths({ months }: CalendarMonthsProps) {
  const singleState = useContext(CalendarStateContext)
  const rangeState = useContext(RangeCalendarStateContext)
  const state = singleState ?? rangeState

  if (!state) {
    throw new Error('CalendarMonths must render inside Calendar')
  }

  const visibleStart = state.visibleRange.start
  const direction = usePageDirection(visibleStart)
  const pageKey = visibleStart.toString()

  return [...Array(months).keys()].map((monthIndex) => (
    <CalendarMonth
      key={monthIndex}
      monthIndex={monthIndex}
      pageKey={pageKey}
      direction={direction}
      showsPrevious={monthIndex === 0}
      showsNext={monthIndex === months - 1}
    />
  ))
}
