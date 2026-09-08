import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'

import {
  radioGroupListVariants,
  radioGroupWrapperClassName,
} from './classnames'
import { RadioGroupSharedStateContext } from './context'
import { RadioGroupOrientation, type RadioGroupRootProps } from './types'

export interface RadioGroupProps extends Omit<
  RadioGroupRootProps,
  'orientation'
> {
  label?: string
  error?: string
  orientation?: RadioGroupOrientation
}

export function RadioGroup({
  label,
  error,
  orientation = RadioGroupOrientation.Vertical,
  className,
  id,
  disabled,
  'aria-describedby': callerDescribedBy,
  children,
  ...props
}: RadioGroupProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const labelId = `${fieldId}-label`
  const hasError = Boolean(error)
  const isDisabled = Boolean(disabled)

  return (
    <div className={cn(radioGroupWrapperClassName, className)}>
      {label ? (
        <span
          id={labelId}
          className={fieldLabelVariants({
            placement: FieldLabelPlacement.Above,
            error: hasError,
            disabled: isDisabled,
          })}
        >
          {label}
        </span>
      ) : null}

      <RadioGroupPrimitive.Root
        id={fieldId}
        disabled={disabled}
        orientation={orientation}
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={describedBy}
        className={radioGroupListVariants({ orientation })}
        {...props}
      >
        <RadioGroupSharedStateContext
          value={{ error: hasError, disabled: isDisabled }}
        >
          {children}
        </RadioGroupSharedStateContext>
      </RadioGroupPrimitive.Root>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
