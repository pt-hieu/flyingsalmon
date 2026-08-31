import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'
import { Spinner } from '@/registry/ui/spinner'

const topAndBottomBorderWidth = '2px'
const topAndBottomPadding = '1rem'

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
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorMessageId = `${fieldId}-error`

  const describedBy =
    [callerDescribedBy, error ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          className={cn(
            'mb-2 text-sm font-medium transition-colors duration-(--motion-fast)',
            error ? 'text-destructive' : 'text-foreground',
            disabled && 'opacity-50',
          )}
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
          className={cn(
            'border-input bg-background text-foreground w-full rounded-md border px-3 py-2 text-sm',
            'field-sizing-content resize-none',
            'placeholder:text-muted-foreground',
            'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
            'enabled:hover:not-focus-visible:border-neutral-300 dark:enabled:hover:not-focus-visible:border-neutral-600',
            'focus-visible:border-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            'read-only:bg-muted read-only:focus-visible:border-muted',
            'disabled:pointer-events-none disabled:opacity-50',
            'aria-invalid:border-destructive aria-invalid:focus-visible:border-background aria-invalid:focus-visible:ring-destructive',
            loading && 'pr-9',
          )}
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

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="error"
            id={errorMessageId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: springBounce }}
            exit={{ height: 0, opacity: 0, transition: springSettle }}
            className="text-destructive overflow-hidden pt-1 text-xs"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
