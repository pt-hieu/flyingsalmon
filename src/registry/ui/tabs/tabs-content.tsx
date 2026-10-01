import { Tabs as TabsPrimitive } from 'radix-ui'

import { useTabsSharedState } from './use-tabs-shared-state'

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>

export function TabsContent({
  value,
  forceMount,
  className,
  ...props
}: TabsContentProps) {
  const { activeValue } = useTabsSharedState()
  const isSelected = activeValue === value
  const forceMountedHiddenProps = forceMount ? { hidden: !isSelected } : {}

  return (
    <TabsPrimitive.Content
      {...props}
      {...forceMountedHiddenProps}
      value={value}
      forceMount={forceMount}
      className={className}
    />
  )
}
