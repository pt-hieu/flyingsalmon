import { cn } from '@/lib/utils'

import { breadcrumbListClassName } from './classnames'

export interface BreadcrumbListProps extends React.ComponentProps<'ol'> {}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return <ol className={cn(breadcrumbListClassName, className)} {...props} />
}
