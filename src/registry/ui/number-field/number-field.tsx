import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import {
  FieldDescription,
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'

import {
  numberFieldAffixClassName,
  numberFieldBoxVariants,
  numberFieldContentVariants,
  numberFieldInputClassName,
  numberFieldWrapperClassName,
} from './classnames'
import { NumberFieldControls } from './number-field-controls'
import { NumberFieldSize } from './types'
import {
  boundForKey,
  committedNumber,
  formatNumber,
  fractionDigitsForStep,
  inputModeForRange,
  parseNumber,
  resolveLocale,
  stepDeltaForKey,
  steppedValue,
  valueTextWithAffixes,
} from './utils'

export interface NumberFieldProps extends Omit<
  React.ComponentProps<'input'>,
  'size' | 'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'prefix'
> {
  label?: string
  size?: NumberFieldSize
  error?: string
  description?: string
  loading?: boolean
  value?: number | null
  defaultValue?: number | null
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  largeStep?: number
  prefix?: string
  unit?: string
  locale?: string
}

export function NumberField({
  label,
  size = NumberFieldSize.Default,
  error,
  description,
  loading = false,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  largeStep,
  prefix,
  unit,
  locale,
  name,
  className,
  id,
  disabled,
  readOnly,
  required,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  'aria-describedby': callerDescribedBy,
  ...props
}: NumberFieldProps) {
  const { fieldId, errorMessageId, descriptionId, describedBy } = useFieldIds({
    id,
    error,
    description,
    describedBy: callerDescribedBy,
  })

  const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(
    defaultValue ?? null,
  )
  const currentValue = value === undefined ? uncontrolledValue : value

  const [isEditing, setIsEditing] = useState(false)
  const [editingText, setEditingText] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const currentValueRef = useRef(currentValue)
  const committedValueRef = useRef(currentValue)

  useEffect(() => {
    currentValueRef.current = currentValue
  })

  const resolvedLocale = resolveLocale(locale)
  const fractionDigits = fractionDigitsForStep(step)
  const resolvedLargeStep = largeStep ?? step * 10

  const formattedValue =
    currentValue === null
      ? ''
      : formatNumber(currentValue, resolvedLocale, fractionDigits)

  const isInteractive = !disabled && !readOnly

  function reportValue(next: number | null) {
    currentValueRef.current = next

    if (value === undefined) {
      setUncontrolledValue(next)
    }

    onValueChange?.(next)
  }

  function commitValue(next: number | null) {
    committedValueRef.current = next

    if (next !== currentValueRef.current) {
      reportValue(next)
    }

    setEditingText(
      next === null ? '' : formatNumber(next, resolvedLocale, fractionDigits),
    )
  }

  function valueForCommittedText(text: string): number | null {
    const trimmedText = text.trim()

    if (trimmedText === '') {
      return null
    }

    const parsed = parseNumber(trimmedText, resolvedLocale)

    if (parsed === null) {
      return committedValueRef.current
    }

    return committedNumber(parsed, min, max, fractionDigits)
  }

  function applyStep(delta: number) {
    commitValue(
      steppedValue(currentValueRef.current, delta, min, max, fractionDigits),
    )
  }

  function stepFromSpinButton(delta: number) {
    inputRef.current?.focus()
    applyStep(delta)
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    committedValueRef.current = currentValue

    setIsEditing(true)
    setEditingText(formattedValue)

    onFocus?.(event)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value
    setEditingText(text)

    const trimmedText = text.trim()

    if (trimmedText === '') {
      reportValue(null)
    } else {
      const parsed = parseNumber(trimmedText, resolvedLocale)

      if (parsed !== null) {
        reportValue(parsed)
      }
    }

    onChange?.(event)
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    commitValue(valueForCommittedText(editingText))
    setIsEditing(false)

    onBlur?.(event)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event)

    if (!isInteractive || event.defaultPrevented) {
      return
    }

    if (event.key === 'Enter') {
      commitValue(valueForCommittedText(editingText))
      return
    }

    const bound = boundForKey(event.key, min, max)

    if (bound !== null) {
      event.preventDefault()
      commitValue(bound)
      return
    }

    const delta = stepDeltaForKey(
      event.key,
      event.shiftKey,
      step,
      resolvedLargeStep,
    )

    if (delta !== null) {
      event.preventDefault()
      applyStep(delta)
    }
  }

  const isAtMinimum =
    min !== undefined && currentValue !== null && currentValue <= min
  const isAtMaximum =
    max !== undefined && currentValue !== null && currentValue >= max

  const valueText =
    currentValue === null
      ? undefined
      : valueTextWithAffixes(formattedValue, prefix, unit)

  return (
    <div className={cn(numberFieldWrapperClassName, className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className={fieldLabelVariants({
            placement: FieldLabelPlacement.Above,
            error: Boolean(error),
            disabled: Boolean(disabled),
            required: Boolean(required),
          })}
        >
          {label}
        </label>
      ) : null}

      <div
        className={numberFieldBoxVariants({
          size,
          error: Boolean(error),
          disabled: Boolean(disabled),
          readOnly: Boolean(readOnly),
        })}
      >
        <div className={numberFieldContentVariants({ size })}>
          {prefix ? (
            <span aria-hidden className={numberFieldAffixClassName}>
              {prefix}
            </span>
          ) : null}

          <input
            ref={inputRef}
            id={fieldId}
            type="text"
            role="spinbutton"
            inputMode={inputModeForRange(min, fractionDigits)}
            value={isEditing ? editingText : formattedValue}
            disabled={disabled}
            readOnly={readOnly}
            aria-required={required || undefined}
            aria-invalid={error ? true : undefined}
            aria-busy={loading || undefined}
            aria-describedby={describedBy}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue ?? undefined}
            aria-valuetext={valueText}
            className={numberFieldInputClassName}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...props}
          />

          {unit ? (
            <span aria-hidden className={numberFieldAffixClassName}>
              {unit}
            </span>
          ) : null}
        </div>

        <NumberFieldControls
          size={size}
          error={Boolean(error)}
          loading={loading}
          controlsId={fieldId}
          decreaseDisabled={!isInteractive || isAtMinimum}
          increaseDisabled={!isInteractive || isAtMaximum}
          onDecrease={() => stepFromSpinButton(-step)}
          onIncrease={() => stepFromSpinButton(step)}
        />
      </div>

      {name ? (
        <input
          type="hidden"
          name={name}
          disabled={disabled}
          value={currentValue === null ? '' : String(currentValue)}
        />
      ) : null}

      <FieldDescription id={descriptionId} disabled={Boolean(disabled)}>
        {description}
      </FieldDescription>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
