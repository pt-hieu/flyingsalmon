import { toCalendarDate, type CalendarDate } from '@internationalized/date'
import {
  DateField,
  DateInput,
  DateSegment,
  type DateValue,
} from 'react-aria-components'

import { formatIsoDate, parseOptionalIsoDate } from '@/registry/lib/iso-date'

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
      minValue={parseOptionalIsoDate(min)}
      maxValue={parseOptionalIsoDate(max)}
      isDateUnavailable={
        isDateDisabled === undefined
          ? undefined
          : (date: DateValue) => isDateDisabled(formatIsoDate(date))
      }
      isDisabled={disabled}
      isReadOnly={readOnly}
      isInvalid={invalid}
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
