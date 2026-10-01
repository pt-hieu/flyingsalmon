import { motion } from 'motion/react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

import {
  switchLabelVariants,
  switchThumbSlotVariants,
  switchThumbVariants,
  switchVariants,
  switchWrapperVariants,
} from './classnames'
import { SwitchSize } from './types'
import type { SwitchRootProps } from './types'

export interface SwitchProps extends Omit<
  SwitchRootProps,
  'asChild' | 'children'
> {
  label?: string
  size?: SwitchSize
  loading?: boolean
}

export function Switch({
  label,
  size = SwitchSize.Default,
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
    <div className={cn(switchWrapperVariants({ size }), className)}>
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
        className={switchVariants({ size, loading })}
        {...props}
      >
        <SwitchPrimitive.Thumb asChild>
          <motion.span
            layout
            transition={springBounce}
            className={switchThumbSlotVariants({ size })}
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
