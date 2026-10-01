import { cn } from '@/lib/utils'

import {
  pageHeaderContainerClassName,
  pageHeaderRowClassName,
} from './classnames'

export function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="page-header"
      className={cn(pageHeaderContainerClassName, className)}
      {...props}
    >
      <div className={pageHeaderRowClassName}>{children}</div>
    </header>
  )
}
