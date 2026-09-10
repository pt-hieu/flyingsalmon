import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import { use } from 'react'

import { cn } from '@/lib/utils'

import {
  toggleGroupItemIconClassName,
  toggleGroupItemVariants,
} from './classnames'
import { ToggleGroupSharedStateContext } from './context'
import { type ToggleGroupItemRootProps, ToggleGroupItemVariant } from './types'

export interface ToggleGroupItemProps extends ToggleGroupItemRootProps {
  variant?: ToggleGroupItemVariant
  icon?: React.ReactNode
}

export function ToggleGroupItem({
  variant = ToggleGroupItemVariant.Default,
  icon,
  value,
  disabled,
  className,
  children,
  ...props
}: ToggleGroupItemProps) {
  const { size, pressedValues, isAtMax } = use(ToggleGroupSharedStateContext)

  const isCapped = isAtMax && !pressedValues.includes(value)

  return (
    <ToggleGroupPrimitive.Item
      value={value}
      disabled={Boolean(disabled) || isCapped}
      className={cn(toggleGroupItemVariants({ variant, size }), className)}
      {...props}
    >
      {icon ? (
        <span aria-hidden className={toggleGroupItemIconClassName}>
          {icon}
        </span>
      ) : null}

      {children}
    </ToggleGroupPrimitive.Item>
  )
}
