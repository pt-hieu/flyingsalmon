import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'

export type CheckboxCheckedState = CheckboxPrimitive.CheckedState

const checkMarkPathOfThreePoints = 'M20 6L9 17L4 12'
const dashMarkPathOfThreePoints = 'M19 12L12 12L5 12'

export interface CheckboxProps extends Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'children'
> {
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
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorMessageId = `${fieldId}-error`

  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<CheckboxCheckedState>(defaultChecked ?? false)
  const currentChecked = checked ?? uncontrolledChecked

  const describedBy =
    [callerDescribedBy, error ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined

  function handleCheckedChange(nextChecked: CheckboxCheckedState) {
    setUncontrolledChecked(nextChecked)
    onCheckedChange?.(nextChecked)
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-2">
        <CheckboxPrimitive.Root
          id={fieldId}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'text-primary-foreground grid size-5 shrink-0 place-items-center rounded-sm border',
            'transition-[background-color,border-color,box-shadow] duration-(--motion-fast)',
            'focus-visible:ring-offset-background focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:outline-none',
            'disabled:pointer-events-none disabled:opacity-50',
            error
              ? [
                  'border-destructive focus-visible:ring-destructive',
                  'data-[state=checked]:bg-destructive data-[state=indeterminate]:bg-destructive',
                  'enabled:hover:data-[state=unchecked]:border-red-700',
                  'dark:enabled:hover:data-[state=unchecked]:border-red-300',
                  'enabled:hover:data-[state=checked]:border-red-700 enabled:hover:data-[state=checked]:bg-red-700',
                  'enabled:hover:data-[state=indeterminate]:border-red-700 enabled:hover:data-[state=indeterminate]:bg-red-700',
                  'dark:enabled:hover:data-[state=checked]:border-red-500 dark:enabled:hover:data-[state=checked]:bg-red-500',
                  'dark:enabled:hover:data-[state=indeterminate]:border-red-500 dark:enabled:hover:data-[state=indeterminate]:bg-red-500',
                ]
              : [
                  'border-input focus-visible:ring-ring',
                  'data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary',
                  'data-[state=checked]:border-primary data-[state=indeterminate]:border-primary',
                  'enabled:hover:data-[state=unchecked]:border-primary',
                  'enabled:hover:data-[state=checked]:border-indigo-700 enabled:hover:data-[state=checked]:bg-indigo-700',
                  'enabled:hover:data-[state=indeterminate]:border-indigo-700 enabled:hover:data-[state=indeterminate]:bg-indigo-700',
                  'dark:enabled:hover:data-[state=checked]:border-indigo-500 dark:enabled:hover:data-[state=checked]:bg-indigo-500',
                  'dark:enabled:hover:data-[state=indeterminate]:border-indigo-500 dark:enabled:hover:data-[state=indeterminate]:bg-indigo-500',
                ],
          )}
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
                className="size-3.5"
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
            className={cn(
              'text-sm font-medium transition-colors duration-(--motion-fast)',
              error ? 'text-destructive' : 'text-foreground',
              disabled && 'opacity-50',
            )}
          >
            {label}
          </label>
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
