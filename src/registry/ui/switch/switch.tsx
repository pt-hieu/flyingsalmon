import { motion } from 'motion/react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

import {
  switchLabelVariants,
  switchThumbClassName,
  switchThumbVariants,
  switchVariants,
  switchWrapperClassName,
} from './classnames'
import type { SwitchRootProps } from './types'

export interface SwitchProps extends Omit<
  SwitchRootProps,
  'asChild' | 'children'
> {
  label?: string
  loading?: boolean
}

export function Switch({
  label,
  loading = false,
  className,
  id,
  disabled,
  onClick,
  ...props
}: SwitchProps) {
  const generatedId = useId()
  const switchId = id ?? generatedId

  return (
    <div className={cn(switchWrapperClassName, className)}>
      <SwitchPrimitive.Root
        id={switchId}
        disabled={disabled}
        aria-disabled={loading || undefined}
        onClick={(event) => {
          if (loading) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
        className={switchVariants({ loading })}
        {...props}
      >
        <SwitchPrimitive.Thumb asChild>
          <motion.span
            layout
            transition={springBounce}
            className={switchThumbClassName}
          >
            <span className={switchThumbVariants({ loading })} />
          </motion.span>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>

      {label ? (
        <label
          htmlFor={switchId}
          className={switchLabelVariants({
            disabled: Boolean(disabled),
            loading,
          })}
        >
          {label}
        </label>
      ) : null}
    </div>
  )
}
