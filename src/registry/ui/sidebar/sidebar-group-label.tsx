import { cn } from '@/lib/utils'

import { sidebarGroupLabelClassName } from './classnames'

export type SidebarGroupLabelProps = React.ComponentProps<'div'>

export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps) {
  return (
    <div className={cn(sidebarGroupLabelClassName, className)} {...props} />
  )
}
