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
  const { activeValue } = useTabsSharedState('TabsContent')
  const isSelected = activeValue === value

  return (
    <TabsPrimitive.Content
      {...props}
      value={value}
      forceMount={forceMount}
      className={className}
      hidden={Boolean(forceMount) && !isSelected}
    />
  )
}
