import type { CalendarDate } from '@internationalized/date'
import { CalendarDays, X } from 'lucide-react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { useRef, useState } from 'react'
import { I18nProvider } from 'react-aria-components'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import { Spinner } from '@/registry/ui/spinner'

import {
  datePickerBoxVariants,
  datePickerEndSlotClassName,
  datePickerFieldColumnClassName,
  datePickerIconButtonClassName,
  datePickerIconClassName,
  datePickerRangeSeparatorClassName,
  datePickerWrapperVariants,
} from './classnames'
import { DatePickerHiddenInput } from './date-picker-hidden-input'
import { DatePickerPanel } from './date-picker-panel'
import { DatePickerSegments } from './date-picker-segments'
import { describeRejection } from './describe-rejection'
import { readEntryValue } from './read-entry-value'
import { spinnerSizeByDatePickerSize } from './spinner-size-by-date-picker-size'
import {
  DatePickerMode,
  DatePickerPanelAlign,
  DatePickerPanelSide,
  DatePickerSize,
  type DatePickerEntry,
  type DatePickerLimits,
  type DatePickerRange,
  type DatePickerValue,
} from './types'
import { useDatePickerValue } from './use-date-picker-value'
import { toValueKey } from './utils'

interface DatePickerBaseProps extends DatePickerLimits {
  label?: string
  labelPlacement?: FieldLabelPlacement
  error?: string
  disabled?: boolean
  required?: boolean
  readOnly?: boolean
  id?: string
  size?: DatePickerSize
  loading?: boolean
  locale?: string
  unavailableMessage?: string
  rangeOrderMessage?: string
  side?: DatePickerPanelSide
  align?: DatePickerPanelAlign
  'aria-describedby'?: string
  className?: string
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: DatePickerMode.Single
  value?: string | null
  defaultValue?: string | null
  onChange?: (value: string | null) => void
  name?: string
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: DatePickerMode.Range
  value?: DatePickerRange | null
  defaultValue?: DatePickerRange | null
  onChange?: (value: DatePickerRange | null) => void
  startName?: string
  endName?: string
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    labelPlacement = FieldLabelPlacement.Above,
    error,
    disabled = false,
    required = false,
    readOnly = false,
    id,
    size = DatePickerSize.Default,
    loading = false,
    locale = 'en-US',
    min,
    max,
    isDateDisabled,
    unavailableMessage = "That date isn't available",
    rangeOrderMessage = 'End date must be after the start date',
    side = DatePickerPanelSide.Bottom,
    align = DatePickerPanelAlign.Center,
    'aria-describedby': callerDescribedBy,
    className,
  } = props

  const mode = props.mode ?? DatePickerMode.Single
  const isRange = mode === DatePickerMode.Range

  const { committedValue, entry, setEntry, rememberValue } = useDatePickerValue(
    {
      value: props.value,
      defaultValue: props.defaultValue,
    },
  )

  const rejectionOptions = {
    mode,
    min,
    max,
    isDateDisabled,
    unavailableMessage,
    rangeOrderMessage,
  }
  const rejectionMessage = describeRejection(entry, rejectionOptions)
  const errorText = error ?? rejectionMessage

  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error: errorText,
    describedBy: callerDescribedBy,
  })
  const labelId = `${fieldId}-label`

  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const postedValue =
    rejectionMessage === undefined ? readEntryValue(entry, mode) : null
  const postedDate = typeof postedValue === 'string' ? postedValue : ''
  const postedRange =
    postedValue === null || typeof postedValue === 'string' ? null : postedValue

  const postsRequired = required && !readOnly

  const showsClear =
    committedValue !== null && !required && !loading && !readOnly && !disabled

  const calendarLabel = label ?? 'Date'

  function notifyChange(nextValue: DatePickerValue) {
    if (props.mode === DatePickerMode.Range) {
      props.onChange?.(typeof nextValue === 'string' ? null : nextValue)
      return
    }

    props.onChange?.(typeof nextValue === 'string' ? nextValue : null)
  }

  function commitValue(nextValue: DatePickerValue) {
    if (toValueKey(nextValue) === toValueKey(committedValue)) {
      return
    }

    rememberValue(nextValue)
    notifyChange(nextValue)
  }

  function applyEntry(nextEntry: DatePickerEntry) {
    setEntry(nextEntry)

    const isEmpty = nextEntry.start === null && nextEntry.end === null
    const nextValue = readEntryValue(nextEntry, mode)

    if (!isEmpty && nextValue === null) {
      return
    }

    if (describeRejection(nextEntry, rejectionOptions) !== undefined) {
      return
    }

    commitValue(nextValue)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen && (loading || disabled)) {
      return
    }

    if (nextOpen) {
      openerRef.current = document.activeElement as HTMLElement | null
    }

    setOpen(nextOpen)
  }

  function handleCloseAutoFocus(event: Event) {
    event.preventDefault()

    const opener = openerRef.current
    const target =
      opener !== null && opener.isConnected ? opener : triggerRef.current
    target?.focus()
  }

  function handleBoxKeyDownCapture(event: React.KeyboardEvent) {
    if (!event.altKey || event.key !== 'ArrowDown' || open) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    handleOpenChange(true)
  }

  function handleClear() {
    commitValue(null)
    triggerRef.current?.focus()
  }

  function handlePanelChange(nextValue: DatePickerValue) {
    commitValue(nextValue)
    setOpen(false)
  }

  function focusFirstSegment() {
    boxRef.current?.querySelector<HTMLElement>('[role="spinbutton"]')?.focus()
  }

  const segmentLimits = { min, max, isDateDisabled }
  const segmentState = {
    disabled,
    readOnly: readOnly || loading,
    invalid: errorText !== undefined,
  }

  return (
    <I18nProvider locale={locale}>
      <div
        className={cn(datePickerWrapperVariants({ labelPlacement }), className)}
      >
        {label ? (
          <label
            id={labelId}
            onClick={focusFirstSegment}
            className={fieldLabelVariants({
              placement: labelPlacement,
              error: errorText !== undefined,
              disabled,
              required,
            })}
          >
            {label}
          </label>
        ) : null}

        <div className={datePickerFieldColumnClassName}>
          <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
            <PopoverPrimitive.Anchor asChild>
              <div
                ref={boxRef}
                id={fieldId}
                role="group"
                aria-labelledby={label ? labelId : undefined}
                aria-describedby={describedBy}
                aria-invalid={errorText === undefined ? undefined : true}
                aria-busy={loading || undefined}
                onKeyDownCapture={handleBoxKeyDownCapture}
                className={datePickerBoxVariants({ size, disabled })}
              >
                <DatePickerSegments
                  {...segmentLimits}
                  {...segmentState}
                  aria-label={isRange ? 'Start date' : 'Date'}
                  value={entry.start}
                  onChange={(nextStart: CalendarDate | null) =>
                    applyEntry({
                      start: nextStart,
                      end: entry.end,
                      isBeingTyped: true,
                    })
                  }
                />

                {isRange ? (
                  <span
                    aria-hidden
                    className={datePickerRangeSeparatorClassName}
                  >
                    –
                  </span>
                ) : null}

                {isRange ? (
                  <DatePickerSegments
                    {...segmentLimits}
                    {...segmentState}
                    aria-label="End date"
                    value={entry.end}
                    onChange={(nextEnd: CalendarDate | null) =>
                      applyEntry({
                        start: entry.start,
                        end: nextEnd,
                        isBeingTyped: true,
                      })
                    }
                  />
                ) : null}

                {props.mode === DatePickerMode.Range ? (
                  <>
                    <DatePickerHiddenInput
                      name={props.startName}
                      value={postedRange?.start ?? ''}
                      required={postsRequired}
                      disabled={disabled}
                    />
                    <DatePickerHiddenInput
                      name={props.endName}
                      value={postedRange?.end ?? ''}
                      required={postsRequired}
                      disabled={disabled}
                    />
                  </>
                ) : (
                  <DatePickerHiddenInput
                    name={props.name}
                    value={postedDate}
                    required={postsRequired}
                    disabled={disabled}
                  />
                )}

                <div className={datePickerEndSlotClassName}>
                  {showsClear ? (
                    <button
                      type="button"
                      aria-label="Clear"
                      onClick={handleClear}
                      className={datePickerIconButtonClassName}
                    >
                      <X aria-hidden className={datePickerIconClassName} />
                    </button>
                  ) : null}

                  <PopoverPrimitive.Trigger
                    ref={triggerRef}
                    aria-label="Calendar"
                    disabled={disabled}
                    className={datePickerIconButtonClassName}
                  >
                    {loading ? (
                      <Spinner
                        aria-hidden
                        size={spinnerSizeByDatePickerSize[size]}
                      />
                    ) : (
                      <CalendarDays
                        aria-hidden
                        className={datePickerIconClassName}
                      />
                    )}
                  </PopoverPrimitive.Trigger>
                </div>
              </div>
            </PopoverPrimitive.Anchor>

            <DatePickerPanel
              {...segmentLimits}
              aria-label={calendarLabel}
              mode={mode}
              value={committedValue}
              onChange={handlePanelChange}
              locale={locale}
              readOnly={readOnly}
              side={side}
              align={align}
              onCloseAutoFocus={handleCloseAutoFocus}
            />
          </PopoverPrimitive.Root>

          <FieldErrorMessage id={errorMessageId}>{errorText}</FieldErrorMessage>
        </div>
      </div>
    </I18nProvider>
  )
}
