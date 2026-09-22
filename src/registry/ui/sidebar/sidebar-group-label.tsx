import { cn } from '@/lib/utils'

import {
  sidebarGroupLabelClassName,
  sidebarGroupLabelTextClassName,
} from './classnames'

export type SidebarGroupLabelProps = React.ComponentProps<'div'>

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: SidebarGroupLabelProps) {
  return (
    <div className={cn(sidebarGroupLabelClassName, className)} {...props}>
      <span className={sidebarGroupLabelTextClassName}>{children}</span>
    </div>
  )
}
