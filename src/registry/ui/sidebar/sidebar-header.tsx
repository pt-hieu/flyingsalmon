import { cn } from '@/lib/utils'

import { sidebarHeaderClassName } from './classnames'

export type SidebarHeaderProps = React.ComponentProps<'div'>

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn(sidebarHeaderClassName, className)} {...props} />
}
