import { datePickerHiddenInputClassName } from './classnames'

export interface DatePickerHiddenInputProps {
  name?: string
  value: string
  required: boolean
  disabled: boolean
}

export function DatePickerHiddenInput({
  name,
  value,
  required,
  disabled,
}: DatePickerHiddenInputProps) {
  return (
    <input
      type="text"
      tabIndex={-1}
      aria-hidden
      name={name}
      value={value}
      onChange={() => undefined}
      required={required}
      disabled={disabled}
      className={datePickerHiddenInputClassName}
    />
  )
}
