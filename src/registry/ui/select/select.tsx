import { ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { useRef } from 'react'

import { cn } from '@/lib/utils'
import {
  FieldDescription,
  FieldErrorMessage,
  fieldLabelVariants,
  FieldLabelPlacement,
  useFieldIds,
} from '@/registry/lib/field'
import { PanelAlign, PanelSide } from '@/registry/lib/panel'

import { Spinner } from '../spinner'

import {
  selectChevronClassName,
  selectEndSlotVariants,
  selectSpinnerErrorClassName,
  selectTriggerVariants,
  selectValueClassName,
  selectWrapperClassName,
} from './classnames'
import { SelectPanel } from './select-panel'
import { SelectSize } from './types'
import { spinnerSizeFor } from './utils'

export interface SelectProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  'children'
> {
  label?: string
  size?: SelectSize
  error?: string
  description?: string
  loading?: boolean
  placeholder?: string
  id?: string
  'aria-describedby'?: string
  side?: PanelSide
  align?: PanelAlign
  className?: string
  children?: React.ReactNode
}

export function Select({
  label,
  size = SelectSize.Default,
  error,
  description,
  loading = false,
  placeholder,
  id,
  'aria-describedby': callerDescribedBy,
  disabled,
  required,
  side = PanelSide.Bottom,
  align = PanelAlign.Center,
  className,
  children,
  ...props
}: SelectProps) {
  const { fieldId, errorMessageId, descriptionId, describedBy } = useFieldIds({
    id,
    error,
    description,
    describedBy: callerDescribedBy,
  })

  const hasError = Boolean(error)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function guardOpeningWhileLoading(event: { preventDefault: () => void }) {
    if (loading) {
      event.preventDefault()
    }
  }

  function guardKeyWhileLoading(event: React.KeyboardEvent) {
    if (event.key !== 'Tab') {
      guardOpeningWhileLoading(event)
    }
  }

  return (
    <div className={cn(selectWrapperClassName, className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          onClick={(event) => {
            event.preventDefault()
            triggerRef.current?.focus()
          }}
          className={fieldLabelVariants({
            placement: FieldLabelPlacement.Above,
            error: hasError,
            disabled: Boolean(disabled),
            required: Boolean(required),
          })}
        >
          {label}
        </label>
      ) : null}

      <SelectPrimitive.Root disabled={disabled} required={required} {...props}>
        <SelectPrimitive.Trigger
          ref={triggerRef}
          id={fieldId}
          aria-invalid={hasError ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          onPointerDown={guardOpeningWhileLoading}
          onKeyDown={guardKeyWhileLoading}
          onClick={guardOpeningWhileLoading}
          className={selectTriggerVariants({ size })}
        >
          <span className={selectValueClassName}>
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>

          <span className={selectEndSlotVariants({ size })}>
            {loading ? (
              <Spinner
                aria-hidden
                size={spinnerSizeFor(size)}
                className={hasError ? selectSpinnerErrorClassName : undefined}
              />
            ) : (
              <ChevronDown aria-hidden className={selectChevronClassName} />
            )}
          </span>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPanel side={side} align={align}>
            {children}
          </SelectPanel>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      <FieldDescription id={descriptionId} disabled={Boolean(disabled)}>
        {description}
      </FieldDescription>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
