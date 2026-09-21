import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'

import { Spinner } from '../spinner'

import {
  inputEndSlotVariants,
  inputFieldRowClassName,
  inputSpinnerErrorClassName,
  inputVariants,
  inputWrapperClassName,
} from './classnames'
import { spinnerSizeByInputSize } from './spinner-size-by-input-size'
import { InputSize, InputType } from './types'

export interface InputProps extends Omit<
  React.ComponentProps<'input'>,
  'size' | 'type'
> {
  label?: string
  size?: InputSize
  type?: InputType
  error?: string
  loading?: boolean
  endAdornment?: React.ReactNode
}

export function Input({
  label,
  size = InputSize.Default,
  type = InputType.Text,
  error,
  loading = false,
  endAdornment,
  className,
  id,
  disabled,
  required,
  'aria-describedby': callerDescribedBy,
  ...props
}: InputProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const endSlotContent = loading ? (
    <Spinner
      aria-hidden
      size={spinnerSizeByInputSize[size]}
      className={error ? inputSpinnerErrorClassName : undefined}
    />
  ) : (
    endAdornment
  )

  return (
    <div className={cn(inputWrapperClassName, className)}>
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

      <div className={inputFieldRowClassName}>
        <input
          id={fieldId}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          className={inputVariants({
            size,
            hasEndSlot: Boolean(endSlotContent),
          })}
          {...props}
        />

        {endSlotContent ? (
          <div className={inputEndSlotVariants({ size })}>{endSlotContent}</div>
        ) : null}
      </div>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
