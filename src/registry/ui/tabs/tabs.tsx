import { LayoutGroup } from 'motion/react'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { useId, useState } from 'react'

import { TabsSharedStateContext } from './context'

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const layoutGroupId = useId()
  const [activeValue, setActiveValue] = useState(value ?? defaultValue)
  const [previousValueProp, setPreviousValueProp] = useState(value)
  const [focusedValue, setFocusedValue] = useState<string | undefined>(
    undefined,
  )

  if (value !== undefined && value !== previousValueProp) {
    setPreviousValueProp(value)
    setActiveValue(value)
  }

  return (
    <TabsSharedStateContext.Provider
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
          className={className}
          {...props}
        />
      </LayoutGroup>
    </TabsSharedStateContext.Provider>
  )
}
