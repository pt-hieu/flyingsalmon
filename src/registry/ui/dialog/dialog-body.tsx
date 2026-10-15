import { cn } from '@/lib/utils'

import { dialogBodyClassName } from './classnames'

export interface DialogBodyProps extends React.ComponentProps<'div'> {}

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return <div className={cn(dialogBodyClassName, className)} {...props} />
}
