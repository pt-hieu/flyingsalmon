import { cn } from '@/lib/utils'

import { dialogFooterClassName } from './classnames'

export interface DialogFooterProps extends React.ComponentProps<'div'> {}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <div className={cn(dialogFooterClassName, className)} {...props} />
}
