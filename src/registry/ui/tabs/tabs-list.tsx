import { Tabs as TabsPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { tabsListClassName } from './classnames'

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(tabsListClassName, className)}
      {...props}
    />
  )
}
