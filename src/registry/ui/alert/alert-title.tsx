import { cn } from '@/lib/utils'

import { alertTitleClassName } from './classnames'

export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(alertTitleClassName, className)} {...props} />
}
