import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  breadcrumbSeparatorClassName,
  breadcrumbSeparatorIconClassName,
} from './classnames'

export interface BreadcrumbSeparatorProps extends Omit<
  React.ComponentProps<'li'>,
  'children'
> {}

export function BreadcrumbSeparator({
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden
      className={cn(breadcrumbSeparatorClassName, className)}
      {...props}
    >
      <ChevronRight className={breadcrumbSeparatorIconClassName} />
    </li>
  )
}
