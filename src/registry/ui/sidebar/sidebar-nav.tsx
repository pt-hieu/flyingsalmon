import { cn } from '@/lib/utils'

import { sidebarNavClassName } from './classnames'

export interface SidebarNavProps extends React.ComponentProps<'nav'> {
  'aria-label': string
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  return <nav className={cn(sidebarNavClassName, className)} {...props} />
}
