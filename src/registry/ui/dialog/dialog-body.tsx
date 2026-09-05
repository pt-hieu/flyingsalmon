import { cn } from '@/lib/utils'

import { dialogBodyClassName } from './classnames'

export function DialogBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(dialogBodyClassName, className)} {...props} />
}
