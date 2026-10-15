import { LayoutGroup } from 'motion/react'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { useId, useState } from 'react'

import { useControllableState } from '@/registry/lib/use-controllable-state'

import { TabsSharedStateContext } from './context'

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  ...props
}: TabsProps) {
  const layoutGroupId = useId()
  const [activeValue, setActiveValue] = useControllableState<
    string | undefined
  >({ value, defaultValue })
  const [focusedValue, setFocusedValue] = useState<string | undefined>(
    undefined,
  )

  return (
    <TabsSharedStateContext
      value={{ activeValue, focusedValue, setFocusedValue }}
    >
      <LayoutGroup id={layoutGroupId}>
        <TabsPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={(nextValue) => {
            setActiveValue(nextValue)
            onValueChange?.(nextValue)
          }}
          {...props}
        />
      </LayoutGroup>
    </TabsSharedStateContext>
  )
}
