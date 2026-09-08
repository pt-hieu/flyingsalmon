import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { use, useId } from 'react'

import { cn } from '@/lib/utils'
import { FieldLabelPlacement, fieldLabelVariants } from '@/registry/lib/field'

import {
  radioGroupDotClassName,
  radioGroupItemRowClassName,
  radioGroupItemVariants,
} from './classnames'
import { RadioGroupSharedStateContext } from './context'
import type { RadioGroupItemRootProps } from './types'

export interface RadioGroupItemProps extends Omit<
  RadioGroupItemRootProps,
  'children'
> {
  label?: string
}

export function RadioGroupItem({
  label,
  className,
  id,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const generatedId = useId()
  const itemId = id ?? generatedId

  const { error, disabled: groupDisabled } = use(RadioGroupSharedStateContext)
  const isDisabled = Boolean(disabled) || groupDisabled

  return (
    <div className={cn(radioGroupItemRowClassName, className)}>
      <RadioGroupPrimitive.Item
        id={itemId}
        disabled={disabled}
        className={radioGroupItemVariants({ error })}
        {...props}
      >
        <span aria-hidden className={radioGroupDotClassName} />
      </RadioGroupPrimitive.Item>

      {label ? (
        <label
          htmlFor={itemId}
          className={fieldLabelVariants({
            placement: FieldLabelPlacement.Beside,
            error,
            disabled: isDisabled,
          })}
        >
          {label}
        </label>
      ) : null}
    </div>
  )
}
