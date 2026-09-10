import { cn } from '@/lib/utils'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

import { sidebarTriggerClassName } from './classnames'
import { useSidebarSharedState } from './use-sidebar'

export interface SidebarTriggerProps extends Omit<
  React.ComponentProps<typeof Button>,
  'variant' | 'size' | 'loading' | 'icon' | 'children'
> {
  children: React.ReactNode
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const { collapsed, setCollapsed, sidebarId } = useSidebarSharedState()

  return (
    <Button
      variant={ButtonVariant.Outline}
      size={ButtonSize.Icon}
      aria-expanded={!collapsed}
      aria-controls={sidebarId}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      onClick={(event) => {
        setCollapsed(!collapsed)
        onClick?.(event)
      }}
      className={cn(sidebarTriggerClassName, className)}
      {...props}
    />
  )
}
