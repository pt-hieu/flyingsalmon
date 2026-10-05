import { cn } from '@/lib/utils'
import {
  FieldDescription,
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'

import { Spinner } from '../spinner'

import {
  textareaFieldRowClassName,
  textareaSpinnerErrorClassName,
  textareaSpinnerSlotClassName,
  textareaVariants,
  textareaWrapperClassName,
} from './classnames'
import type { TextareaElementProps } from './types'
import { rowsToHeight } from './utils'

export interface TextareaProps extends Omit<TextareaElementProps, 'rows'> {
  label?: string
  error?: string
  description?: string
  loading?: boolean
  minRows?: number
  maxRows?: number
}

export function Textarea({
  label,
  error,
  description,
  loading = false,
  minRows = 3,
  maxRows = 8,
  className,
  style,
  id,
  disabled,
  required,
  'aria-describedby': callerDescribedBy,
  ...props
}: TextareaProps) {
  const { fieldId, errorMessageId, descriptionId, describedBy } = useFieldIds({
    id,
    error,
    description,
    describedBy: callerDescribedBy,
  })

  return (
    <div className={cn(textareaWrapperClassName, className)}>
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

      <div className={textareaFieldRowClassName}>
        <textarea
          id={fieldId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          style={
            {
              '--textarea-min-height': rowsToHeight(minRows),
              '--textarea-max-height': rowsToHeight(maxRows),
              ...style,
            } as React.CSSProperties
          }
          className={textareaVariants({ loading })}
          {...props}
          rows={minRows}
        />

        {loading ? (
          <div className={textareaSpinnerSlotClassName}>
            <Spinner
              aria-hidden
              className={error ? textareaSpinnerErrorClassName : undefined}
            />
          </div>
        ) : null}
      </div>

      <FieldDescription id={descriptionId} disabled={Boolean(disabled)}>
        {description}
      </FieldDescription>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
