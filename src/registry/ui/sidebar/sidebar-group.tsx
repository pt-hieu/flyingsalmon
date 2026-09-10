import { cn } from '@/lib/utils'

import { sidebarGroupClassName } from './classnames'

export type SidebarGroupProps = React.ComponentProps<'div'>

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn(sidebarGroupClassName, className)} {...props} />
}
