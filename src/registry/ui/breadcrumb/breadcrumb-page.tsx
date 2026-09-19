import { cn } from '@/lib/utils'

import { breadcrumbPageClassName } from './classnames'

export interface BreadcrumbPageProps extends React.ComponentProps<'span'> {}

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn(breadcrumbPageClassName, className)}
      {...props}
    />
  )
}
