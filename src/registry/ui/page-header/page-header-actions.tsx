import { cn } from '@/lib/utils'

import { pageHeaderActionsClassName } from './classnames'

export function PageHeaderActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn(pageHeaderActionsClassName, className)}
      {...props}
    />
  )
}
