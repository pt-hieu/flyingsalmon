import { Popover as PopoverPrimitive } from 'radix-ui'

import { Calendar, CalendarMode } from '../calendar'

import { datePickerPanelClassName } from './classnames'
import {
  DatePickerMode,
  type DatePickerLimits,
  type DatePickerPanelAlign,
  type DatePickerPanelSide,
  type DatePickerValue,
} from './types'

export interface DatePickerPanelProps extends DatePickerLimits {
  'aria-label': string
  mode: DatePickerMode
  value: DatePickerValue
  onChange: (value: DatePickerValue) => void
  locale: string
  readOnly: boolean
  side: DatePickerPanelSide
  align: DatePickerPanelAlign
  onCloseAutoFocus: (event: Event) => void
}

export function DatePickerPanel({
  'aria-label': ariaLabel,
  mode,
  value,
  onChange,
  locale,
  min,
  max,
  isDateDisabled,
  readOnly,
  side,
  align,
  onCloseAutoFocus,
}: DatePickerPanelProps) {
  const calendarProps = {
    'aria-label': ariaLabel,
    locale,
    min,
    max,
    isDateDisabled,
    readOnly,
    autoFocus: true,
  }

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={8}
        alignOffset={0}
        avoidCollisions
        collisionPadding={8}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={onCloseAutoFocus}
        className={datePickerPanelClassName}
      >
        {mode === DatePickerMode.Range ? (
          <Calendar
            {...calendarProps}
            mode={CalendarMode.Range}
            months={2}
            value={typeof value === 'string' ? null : value}
            onChange={onChange}
          />
        ) : (
          <Calendar
            {...calendarProps}
            value={typeof value === 'string' ? value : null}
            onChange={onChange}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
