import { motion } from 'motion/react'
import { Tabs as TabsPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

import {
  tabsActiveIndicatorClassName,
  tabsFocusIndicatorClassName,
  tabsTriggerClassName,
} from './classnames'
import { useTabsSharedState } from './use-tabs-shared-state'

export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>

export function TabsTrigger({
  value,
  className,
  onFocus,
  onBlur,
  children,
  ...props
}: TabsTriggerProps) {
  const { activeValue, focusedValue, setFocusedValue } = useTabsSharedState()

  const isActive = activeValue === value
  const showFocusIndicator = focusedValue === value && !isActive

  return (
    <TabsPrimitive.Trigger
      value={value}
      onFocus={(event) => {
        setFocusedValue(value)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocusedValue((currentFocusedValue) =>
          currentFocusedValue === value ? undefined : currentFocusedValue,
        )
        onBlur?.(event)
      }}
      className={cn(tabsTriggerClassName, className)}
      {...props}
    >
      {children}
      {isActive ? (
        <motion.span
          layout
          layoutId="tabs-active-indicator"
          transition={springBounce}
          className={tabsActiveIndicatorClassName}
        />
      ) : null}
      {showFocusIndicator ? (
        <motion.span
          layout
          layoutId="tabs-focus-indicator"
          transition={springBounce}
          className={tabsFocusIndicatorClassName}
        />
      ) : null}
    </TabsPrimitive.Trigger>
  )
}
