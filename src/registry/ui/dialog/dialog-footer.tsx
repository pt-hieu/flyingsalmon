import { cn } from '@/lib/utils'

import { dialogFooterVariants } from './classnames'

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(dialogFooterVariants(), className)} {...props} />
}
