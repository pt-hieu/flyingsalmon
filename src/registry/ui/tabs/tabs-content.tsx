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
  const forceMountedVisibility = forceMount ? { hidden: !isSelected } : {}

  return (
    <TabsPrimitive.Content
      {...props}
      {...forceMountedVisibility}
      value={value}
      forceMount={forceMount}
      className={className}
    />
  )
}
