import {
  parseDate,
  toCalendarDate,
  type CalendarDate,
} from '@internationalized/date'
import {
  DateField,
  DateInput,
  DateSegment,
  type DateValue,
} from 'react-aria-components'

import {
  datePickerSegmentClassName,
  datePickerSegmentGroupClassName,
} from './classnames'
import type { DatePickerLimits } from './types'

export interface DatePickerSegmentsProps extends DatePickerLimits {
  'aria-label': string
  value: CalendarDate | null
  onChange: (value: CalendarDate | null) => void
  disabled: boolean
  readOnly: boolean
  invalid: boolean
}

export function DatePickerSegments({
  'aria-label': ariaLabel,
  value,
  onChange,
  min,
  max,
  isDateDisabled,
  disabled,
  readOnly,
  invalid,
}: DatePickerSegmentsProps) {
  return (
    <DateField
      aria-label={ariaLabel}
      granularity="day"
      value={value}
      onChange={(next) => onChange(next === null ? null : toCalendarDate(next))}
      minValue={min === undefined ? undefined : parseDate(min)}
      maxValue={max === undefined ? undefined : parseDate(max)}
      isDateUnavailable={
        isDateDisabled === undefined
          ? undefined
          : (date: DateValue) => isDateDisabled(toCalendarDate(date).toString())
      }
      isDisabled={disabled}
      isReadOnly={readOnly}
      isInvalid={invalid}
      className={datePickerSegmentGroupClassName}
    >
      <DateInput className={datePickerSegmentGroupClassName}>
        {(segment) => (
          <DateSegment
            segment={segment}
            className={datePickerSegmentClassName}
          />
        )}
      </DateInput>
    </DateField>
  )
}
