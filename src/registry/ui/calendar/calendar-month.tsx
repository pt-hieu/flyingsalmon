import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Button as AriaButton,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
} from 'react-aria-components'

import { CalendarDay } from './calendar-day'
import {
  calendarGridBodyClassName,
  calendarGridClassName,
  calendarHeadingClassName,
  calendarMonthClassName,
  calendarMonthHeaderClassName,
  calendarNavButtonClassName,
  calendarNavIconClassName,
  calendarNavSpacerClassName,
  calendarWeekdayClassName,
} from './classnames'
import type { CalendarPageDirection } from './types'

export interface CalendarMonthProps {
  monthIndex: number
  pageKey: string
  direction: CalendarPageDirection | undefined
  showsPrevious: boolean
  showsNext: boolean
}

export function CalendarMonth({
  monthIndex,
  pageKey,
  direction,
  showsPrevious,
  showsNext,
}: CalendarMonthProps) {
  const offset = { months: monthIndex }

  return (
    <div className={calendarMonthClassName}>
      <div className={calendarMonthHeaderClassName}>
        {showsPrevious ? (
          <AriaButton slot="previous" className={calendarNavButtonClassName}>
            <ChevronLeft aria-hidden className={calendarNavIconClassName} />
          </AriaButton>
        ) : (
          <span className={calendarNavSpacerClassName} />
        )}
        <CalendarHeading
          key={pageKey}
          offset={offset}
          data-direction={direction}
          className={calendarHeadingClassName}
        />
        {showsNext ? (
          <AriaButton slot="next" className={calendarNavButtonClassName}>
            <ChevronRight aria-hidden className={calendarNavIconClassName} />
          </AriaButton>
        ) : (
          <span className={calendarNavSpacerClassName} />
        )}
      </div>
      <CalendarGrid
        offset={offset}
        weekdayStyle="short"
        className={calendarGridClassName}
      >
        <CalendarGridHeader>
          {(weekday) => (
            <CalendarHeaderCell className={calendarWeekdayClassName}>
              {weekday}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody
          key={pageKey}
          data-direction={direction}
          className={calendarGridBodyClassName}
        >
          {(date) => <CalendarDay date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  )
}
