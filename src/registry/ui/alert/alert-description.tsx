import { cn } from '@/lib/utils'

import { alertDescriptionClassName } from './classnames'

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(alertDescriptionClassName, className)} {...props} />
}
