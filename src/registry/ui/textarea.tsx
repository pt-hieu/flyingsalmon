import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { FieldErrorMessage, useFieldIds } from '@/registry/lib/field'
import { Spinner } from '@/registry/ui/spinner'

const topAndBottomBorderWidth = '2px'
const topAndBottomPadding = '1rem'

const textareaVariants = cva(
  cn(
    'border-input bg-background text-foreground w-full rounded-md border px-3 py-2 text-sm',
    'field-sizing-content resize-none',
    'placeholder:text-muted-foreground',
    'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
    'enabled:hover:not-focus-visible:border-neutral-300 dark:enabled:hover:not-focus-visible:border-neutral-600',
    'focus-visible:border-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
    'read-only:bg-muted read-only:focus-visible:border-muted',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:focus-visible:border-background aria-invalid:focus-visible:ring-destructive',
  ),
  {
    variants: {
      loading: {
        true: 'pr-9',
        false: '',
      },
    },
    defaultVariants: {
      loading: false,
    },
  },
)

const textareaLabelVariants = cva(
  'mb-2 text-sm font-medium transition-colors duration-(--motion-fast)',
  {
    variants: {
      error: {
        true: 'text-destructive',
        false: 'text-foreground',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  },
)

function rowsToHeight(rows: number) {
  return `calc(${rows}lh + ${topAndBottomBorderWidth} + ${topAndBottomPadding})`
}

export interface TextareaProps extends Omit<
  React.ComponentProps<'textarea'>,
  'rows'
> {
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
    <div className={cn('flex w-full flex-col', className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className={textareaLabelVariants({
            error: Boolean(error),
            disabled: Boolean(disabled),
          })}
        >
          {label}
        </label>
      ) : null}

      <div className="relative flex">
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
          <div className="pointer-events-none absolute top-2 right-3 flex items-center">
            <Spinner
              aria-hidden
              className={error ? 'text-destructive' : undefined}
            />
          </div>
        ) : null}
      </div>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
