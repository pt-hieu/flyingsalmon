import { cn } from '@/lib/utils'
import {
  FieldDescription,
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'

import { Spinner, SpinnerSize } from '../spinner'

import {
  inputEndSlotVariants,
  inputFieldRowClassName,
  inputSpinnerErrorClassName,
  inputVariants,
  inputWrapperClassName,
} from './classnames'
import { InputSize, InputType } from './types'

export interface InputProps extends Omit<
  React.ComponentProps<'input'>,
  'size' | 'type'
> {
  label?: string
  size?: InputSize
  type?: InputType
  error?: string
  description?: string
  loading?: boolean
  endAdornment?: React.ReactNode
}

export function Input({
  label,
  size = InputSize.Default,
  type = InputType.Text,
  error,
  description,
  loading = false,
  endAdornment,
  className,
  id,
  disabled,
  required,
  'aria-describedby': callerDescribedBy,
  ...props
}: InputProps) {
  const { fieldId, errorMessageId, descriptionId, describedBy } = useFieldIds({
    id,
    error,
    description,
    describedBy: callerDescribedBy,
  })

  const endSlotContent = loading ? (
    <Spinner
      aria-hidden
      size={size === InputSize.Small ? SpinnerSize.Small : SpinnerSize.Default}
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

      <FieldDescription id={descriptionId} disabled={Boolean(disabled)}>
        {description}
      </FieldDescription>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
