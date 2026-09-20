import { cn } from '@/lib/utils'

import { breadcrumbListClassName } from './classnames'

export interface BreadcrumbProps extends React.ComponentProps<'ol'> {}

export function Breadcrumb({
  'aria-label': ariaLabel = 'Breadcrumb',
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className={cn(breadcrumbListClassName, className)} {...props} />
    </nav>
  )
}
