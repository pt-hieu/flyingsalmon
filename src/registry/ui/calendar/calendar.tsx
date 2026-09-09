import {
  type CalendarDate,
  type DateValue,
  parseDate,
} from '@internationalized/date'
import {
  Calendar as AriaCalendar,
  type CalendarProps as AriaCalendarProps,
  I18nProvider,
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps as AriaRangeCalendarProps,
} from 'react-aria-components'

import { cn } from '@/lib/utils'

import { CalendarMonths } from './calendar-months'
import { calendarRootClassName } from './classnames'
import { CalendarAppearanceContext } from './context'
import { formatIsoDate } from './format-iso-date'
import { CalendarMode, type CalendarRange } from './types'

interface CalendarBaseProps {
  'aria-label': string
  months?: 1 | 2
  locale?: string
  min?: string
  max?: string
  isDateDisabled?: (date: string) => boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  className?: string
}

export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: CalendarMode.Single
  value?: string | null
  onChange?: (value: string | null) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  mode: CalendarMode.Range
  value?: CalendarRange | null
  onChange?: (value: CalendarRange | null) => void
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps

export function Calendar(props: CalendarProps) {
  const {
    'aria-label': ariaLabel,
    months = 1,
    locale = 'en-US',
    min,
    max,
    isDateDisabled,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    className,
  } = props

  const sharedProps = {
    'aria-label': ariaLabel,
    minValue: min === undefined ? undefined : parseDate(min),
    maxValue: max === undefined ? undefined : parseDate(max),
    isDateUnavailable:
      isDateDisabled === undefined
        ? undefined
        : (date: DateValue) => isDateDisabled(formatIsoDate(date)),
    isDisabled: disabled,
    isReadOnly: readOnly,
    autoFocus,
    visibleDuration: { months },
    weeksInMonth: 6,
    selectionAlignment: 'start',
    className: cn(calendarRootClassName, className),
  } satisfies Partial<AriaCalendarProps<CalendarDate>> &
    Partial<AriaRangeCalendarProps<CalendarDate>>

  if (props.mode === CalendarMode.Range) {
    const { value, onChange } = props
    return (
      <I18nProvider locale={locale}>
        <CalendarAppearanceContext.Provider
          value={{ mode: CalendarMode.Range, calendarDisabled: disabled }}
        >
          <AriaRangeCalendar
            {...sharedProps}
            commitBehavior="reset"
            value={
              value === undefined || value === null
                ? value
                : {
                    start: parseDate(value.start),
                    end: parseDate(value.end),
                  }
            }
            onChange={(range) =>
              onChange?.({
                start: formatIsoDate(range.start),
                end: formatIsoDate(range.end),
              })
            }
          >
            <CalendarMonths months={months} />
          </AriaRangeCalendar>
        </CalendarAppearanceContext.Provider>
      </I18nProvider>
    )
  }

  const { value, onChange } = props
  return (
    <I18nProvider locale={locale}>
      <CalendarAppearanceContext.Provider
        value={{ mode: CalendarMode.Single, calendarDisabled: disabled }}
      >
        <AriaCalendar
          {...sharedProps}
          value={
            value === undefined || value === null ? value : parseDate(value)
          }
          onChange={(date) => onChange?.(formatIsoDate(date))}
        >
          <CalendarMonths months={months} />
        </AriaCalendar>
      </CalendarAppearanceContext.Provider>
    </I18nProvider>
  )
}
