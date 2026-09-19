import { cn } from '@/lib/utils'

import { breadcrumbItemClassName } from './classnames'

export interface BreadcrumbItemProps extends React.ComponentProps<'li'> {}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return <li className={cn(breadcrumbItemClassName, className)} {...props} />
}
