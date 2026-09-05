import { ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { useRef } from 'react'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import { Spinner } from '@/registry/ui/spinner'

import {
  selectChevronClassName,
  selectEndSlotVariants,
  selectSpinnerErrorClassName,
  selectTriggerVariants,
  selectValueClassName,
  selectWrapperClassName,
} from './classnames'
import { SelectPanel } from './select-panel'
import { spinnerSizeBySelectSize } from './spinner-size-by-select-size'
import { SelectPanelAlign, SelectPanelSide, SelectSize } from './types'

export interface SelectProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  'children'
> {
  label?: string
  size?: SelectSize
  error?: string
  loading?: boolean
  placeholder?: string
  id?: string
  'aria-describedby'?: string
  side?: SelectPanelSide
  align?: SelectPanelAlign
  exhibitionMode?: boolean
  className?: string
  children?: React.ReactNode
}

export function Select({
  label,
  size = SelectSize.Default,
  error,
  loading = false,
  placeholder,
  id,
  'aria-describedby': callerDescribedBy,
  disabled,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  side = SelectPanelSide.Bottom,
  align = SelectPanelAlign.Center,
  exhibitionMode = false,
  className,
  children,
  ...props
}: SelectProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const hasError = Boolean(error)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function guardOpeningWhileLoading(event: { preventDefault: () => void }) {
    if (loading) {
      event.preventDefault()
    }
  }

  const panel = (
    <SelectPanel side={side} align={align}>
      {children}
    </SelectPanel>
  )

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
          })}
        >
          {label}
        </label>
      ) : null}

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
        required={required}
        name={name}
        {...props}
      >
        <SelectPrimitive.Trigger
          ref={triggerRef}
          id={fieldId}
          aria-invalid={hasError ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          onPointerDown={guardOpeningWhileLoading}
          onKeyDown={guardOpeningWhileLoading}
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
                size={spinnerSizeBySelectSize[size]}
                className={hasError ? selectSpinnerErrorClassName : undefined}
              />
            ) : (
              <ChevronDown aria-hidden className={selectChevronClassName} />
            )}
          </span>
        </SelectPrimitive.Trigger>

        {exhibitionMode ? (
          panel
        ) : (
          <SelectPrimitive.Portal>{panel}</SelectPrimitive.Portal>
        )}
      </SelectPrimitive.Root>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
