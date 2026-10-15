import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import { useControllableState } from '@/registry/lib/use-controllable-state'

import {
  toggleGroupListClassName,
  toggleGroupWrapperClassName,
} from './classnames'
import { ToggleGroupSharedStateContext } from './context'
import { ToggleGroupMode, ToggleGroupSize } from './types'
import { toPressedValues } from './utils'

interface ToggleGroupBaseProps extends Omit<
  React.ComponentProps<'div'>,
  'defaultValue' | 'dir'
> {
  label?: string
  error?: string
  size?: ToggleGroupSize
  required?: boolean
  name?: string
  disabled?: boolean
}

export interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  mode?: ToggleGroupMode.Single
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  mode: ToggleGroupMode.Multiple
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  max?: number
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

export function ToggleGroup(props: ToggleGroupProps) {
  const { max, ...propsWithoutMax } =
    props.mode === ToggleGroupMode.Multiple
      ? props
      : { ...props, max: undefined }

  const {
    mode = ToggleGroupMode.Single,
    label,
    error,
    size = ToggleGroupSize.Default,
    required = false,
    name,
    className,
    id,
    disabled,
    children,
    value,
    defaultValue,
    onValueChange,
    'aria-describedby': callerDescribedBy,
    ...rest
  } = propsWithoutMax

  const { fieldId, labelId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const hasError = Boolean(error)
  const isDisabled = Boolean(disabled)

  const reportChange = (nextValues: string[]) => {
    if (props.mode === ToggleGroupMode.Multiple) {
      props.onValueChange?.(nextValues)
    } else {
      props.onValueChange?.(nextValues[0] ?? '')
    }
  }

  const [pressedValues, setPressedValues] = useControllableState({
    value: value === undefined ? undefined : toPressedValues(value),
    defaultValue: toPressedValues(defaultValue),
    onChange: reportChange,
  })

  const isAtMax = max !== undefined && pressedValues.length >= max

  const commitValues = (nextValues: string[]) => {
    if (required && nextValues.length === 0) return

    setPressedValues(nextValues)
  }

  const sharedRootProps = {
    id: fieldId,
    disabled,
    orientation: 'horizontal' as const,
    'aria-labelledby': label ? labelId : undefined,
    'aria-invalid': hasError ? true : undefined,
    'aria-describedby': describedBy,
    className: toggleGroupListClassName,
    ...rest,
  }

  return (
    <div className={cn(toggleGroupWrapperClassName, className)}>
      {label ? (
        <span
          id={labelId}
          className={fieldLabelVariants({
            placement: FieldLabelPlacement.Above,
            error: hasError,
            disabled: isDisabled,
            required,
          })}
        >
          {label}
        </span>
      ) : null}

      <ToggleGroupSharedStateContext value={{ size, pressedValues, isAtMax }}>
        {mode === ToggleGroupMode.Multiple ? (
          <ToggleGroupPrimitive.Root
            type="multiple"
            role="group"
            value={pressedValues}
            onValueChange={commitValues}
            {...sharedRootProps}
          >
            {children}
          </ToggleGroupPrimitive.Root>
        ) : (
          <ToggleGroupPrimitive.Root
            type="single"
            aria-required={required || undefined}
            value={pressedValues[0] ?? ''}
            onValueChange={(nextValue) =>
              commitValues(toPressedValues(nextValue))
            }
            {...sharedRootProps}
          >
            {children}
          </ToggleGroupPrimitive.Root>
        )}
      </ToggleGroupSharedStateContext>

      {name
        ? pressedValues.map((pressedValue) => (
            <input
              key={pressedValue}
              type="hidden"
              name={name}
              value={pressedValue}
              disabled={isDisabled}
            />
          ))
        : null}

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
