import { cn } from '@/lib/utils'

import { sidebarFooterClassName } from './classnames'

export type SidebarFooterProps = React.ComponentProps<'div'>

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(sidebarFooterClassName, className)}
      {...props}
    />
  )
}
