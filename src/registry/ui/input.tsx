import { cva, type VariantProps } from 'class-variance-authority'

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

const inputVariants = cva(
  cn(
    'border-input bg-background text-foreground w-full rounded-md border',
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
      size: {
        default: 'h-9 px-3 text-sm',
        sm: 'h-8 px-2.5 text-sm',
      },
      hasEndSlot: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'default', hasEndSlot: true, class: 'pr-9' },
      { size: 'sm', hasEndSlot: true, class: 'pr-8' },
    ],
    defaultVariants: {
      size: 'default',
      hasEndSlot: false,
    },
  },
)

const inputEndSlotVariants = cva(
  'pointer-events-none absolute flex items-center [&_button]:pointer-events-auto',
  {
    variants: {
      size: {
        default: 'right-3',
        sm: 'right-2.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type InputSize = NonNullable<VariantProps<typeof inputVariants>['size']>

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
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

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
          className={fieldLabelVariants({
            placement: 'above',
            error: Boolean(error),
            disabled: Boolean(disabled),
          })}
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
