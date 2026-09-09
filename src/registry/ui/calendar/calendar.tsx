import type { DateValue } from '@internationalized/date'
import {
  Calendar as AriaCalendar,
  I18nProvider,
  RangeCalendar as AriaRangeCalendar,
} from 'react-aria-components'

import { cn } from '@/lib/utils'

import { CalendarMonths } from './calendar-months'
import { calendarRootClassName } from './classnames'
import { formatIsoDate, parseIsoDate } from './iso-date'
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
    minValue: min === undefined ? undefined : parseIsoDate(min),
    maxValue: max === undefined ? undefined : parseIsoDate(max),
    isDateUnavailable:
      isDateDisabled === undefined
        ? undefined
        : (date: DateValue) => isDateDisabled(formatIsoDate(date)),
    isDisabled: disabled,
    isReadOnly: readOnly,
    autoFocus,
    visibleDuration: { months },
    weeksInMonth: 6,
    selectionAlignment: 'start' as const,
    className: cn(calendarRootClassName, className),
  }

  if (props.mode === CalendarMode.Range) {
    const { value, onChange } = props
    return (
      <I18nProvider locale={locale}>
        <AriaRangeCalendar
          {...sharedProps}
          commitBehavior="reset"
          value={
            value === undefined || value === null
              ? value
              : {
                  start: parseIsoDate(value.start),
                  end: parseIsoDate(value.end),
                }
          }
          onChange={(range) =>
            onChange?.({
              start: formatIsoDate(range.start),
              end: formatIsoDate(range.end),
            })
          }
        >
          <CalendarMonths
            months={months}
            mode={CalendarMode.Range}
            calendarDisabled={disabled}
          />
        </AriaRangeCalendar>
      </I18nProvider>
    )
  }

  const { value, onChange } = props
  return (
    <I18nProvider locale={locale}>
      <AriaCalendar
        {...sharedProps}
        value={
          value === undefined || value === null ? value : parseIsoDate(value)
        }
        onChange={(date) => onChange?.(formatIsoDate(date))}
      >
        <CalendarMonths
          months={months}
          mode={CalendarMode.Single}
          calendarDisabled={disabled}
        />
      </AriaCalendar>
    </I18nProvider>
  )
}
