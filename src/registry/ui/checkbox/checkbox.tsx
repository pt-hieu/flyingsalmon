import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import { springBounce, springSettle } from '@/registry/lib/motion'

import {
  checkboxMarkClassName,
  checkboxRowClassName,
  checkboxVariants,
  checkboxWrapperClassName,
} from './classnames'
import {
  checkMarkPathOfThreePoints,
  dashMarkPathOfThreePoints,
} from './mark-paths'
import type { CheckboxCheckedState, CheckboxRootProps } from './types'

export interface CheckboxProps extends Omit<CheckboxRootProps, 'children'> {
  label?: string
  error?: string
}

export function Checkbox({
  label,
  error,
  className,
  id,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  'aria-describedby': callerDescribedBy,
  ...props
}: CheckboxProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<CheckboxCheckedState>(defaultChecked ?? false)
  const currentChecked = checked ?? uncontrolledChecked

  const hasError = Boolean(error)

  function handleCheckedChange(nextChecked: CheckboxCheckedState) {
    setUncontrolledChecked(nextChecked)
    onCheckedChange?.(nextChecked)
  }

  return (
    <div className={cn(checkboxWrapperClassName, className)}>
      <div className={checkboxRowClassName}>
        <CheckboxPrimitive.Root
          id={fieldId}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={checkboxVariants({ error: hasError })}
          {...props}
        >
          <AnimatePresence initial={false}>
            {currentChecked === false ? null : (
              <motion.svg
                key="mark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={checkboxMarkClassName}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: springBounce }}
                exit={{ scale: 0, opacity: 0, transition: springSettle }}
              >
                <motion.path
                  initial={false}
                  animate={{
                    d:
                      currentChecked === 'indeterminate'
                        ? dashMarkPathOfThreePoints
                        : checkMarkPathOfThreePoints,
                    transition: springBounce,
                  }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </CheckboxPrimitive.Root>

        {label ? (
          <label
            htmlFor={fieldId}
            className={fieldLabelVariants({
              placement: FieldLabelPlacement.Beside,
              error: hasError,
              disabled: Boolean(disabled),
            })}
          >
            {label}
          </label>
        ) : null}
      </div>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
