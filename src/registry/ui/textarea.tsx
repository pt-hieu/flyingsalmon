import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import {
  boundaryFocusRingGeometry,
  disabledInteraction,
  invalidBoundaryFocusRingGeometry,
} from '@/registry/lib/interaction'
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
    'focus-visible:ring-ring',
    boundaryFocusRingGeometry,
    'read-only:bg-muted read-only:focus-visible:border-muted',
    disabledInteraction,
    'aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive',
    invalidBoundaryFocusRingGeometry,
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
          className={fieldLabelVariants({
            placement: 'above',
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
