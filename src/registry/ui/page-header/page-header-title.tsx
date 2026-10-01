import { cn } from '@/lib/utils'

import { pageHeaderTitleClassName } from './classnames'

export function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn(pageHeaderTitleClassName, className)}
      {...props}
    />
  )
}
