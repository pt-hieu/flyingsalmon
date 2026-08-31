import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'
import { Spinner } from '@/registry/ui/spinner'

const inputSizeClasses = {
  default: 'h-9 px-3 text-sm',
  sm: 'h-8 px-2.5 text-sm',
} as const

const endSlotPaddingClasses = {
  default: 'pr-9',
  sm: 'pr-8',
} as const

const endSlotPositionClasses = {
  default: 'right-3',
  sm: 'right-2.5',
} as const

export type InputSize = keyof typeof inputSizeClasses

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'

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
  size = 'default',
  type = 'text',
  error,
  loading = false,
  endAdornment,
  className,
  id,
  disabled,
  'aria-describedby': callerDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorMessageId = `${fieldId}-error`

  const describedBy =
    [callerDescribedBy, error ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined

  const endSlotContent = loading ? (
    <Spinner
      aria-hidden
      size={size}
      className={error ? 'text-destructive' : undefined}
    />
  ) : (
    endAdornment
  )

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

      <div className="relative flex items-center">
        <input
          id={fieldId}
          type={type}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          className={cn(
            'border-input bg-background text-foreground w-full rounded-md border',
            'placeholder:text-muted-foreground',
            'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
            'enabled:hover:border-neutral-300 dark:enabled:hover:border-neutral-600',
            'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            'read-only:bg-muted',
            'disabled:pointer-events-none disabled:opacity-50',
            'aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive',
            inputSizeClasses[size],
            endSlotContent && endSlotPaddingClasses[size],
          )}
          {...props}
        />

        {endSlotContent ? (
          <div
            className={cn(
              'pointer-events-none absolute flex items-center [&_button]:pointer-events-auto',
              endSlotPositionClasses[size],
            )}
          >
            {endSlotContent}
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
