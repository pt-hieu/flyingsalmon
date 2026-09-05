import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import { Spinner } from '@/registry/ui/spinner'

import {
  textareaFieldRowClassName,
  textareaSpinnerErrorClassName,
  textareaSpinnerSlotClassName,
  textareaVariants,
  textareaWrapperClassName,
} from './classnames'
import { rowsToHeight } from './rows-to-height'
import type { TextareaElementProps } from './types'

export interface TextareaProps extends Omit<TextareaElementProps, 'rows'> {
  label?: string
  error?: string
  loading?: boolean
  minRows?: number
  maxRows?: number
}

export function Textarea({
  label,
  error,
  loading = false,
  minRows = 3,
  maxRows = 8,
  className,
  style,
  id,
  disabled,
  'aria-describedby': callerDescribedBy,
  ...props
}: TextareaProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
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
          })}
        >
          {label}
        </label>
      ) : null}

      <div className={textareaFieldRowClassName}>
        <textarea
          id={fieldId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          style={{
            minHeight: rowsToHeight(minRows),
            maxHeight: rowsToHeight(maxRows),
            ...style,
          }}
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

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
