import { cn } from '@/lib/utils'

import { sidebarContentClassName } from './classnames'

export type SidebarContentProps = React.ComponentProps<'div'>

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn(sidebarContentClassName, className)} {...props} />
}
