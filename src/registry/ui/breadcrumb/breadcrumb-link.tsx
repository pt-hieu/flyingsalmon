import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

import { breadcrumbLinkClassName } from './classnames'

export interface BreadcrumbLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean
}

export function BreadcrumbLink({
  asChild = false,
  className,
  ...props
}: BreadcrumbLinkProps) {
  const Anchor = asChild ? Slot.Root : 'a'

  return (
    <Anchor className={cn(breadcrumbLinkClassName, className)} {...props} />
  )
}
