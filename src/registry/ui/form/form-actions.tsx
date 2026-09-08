import { cn } from '@/lib/utils'

import { formActionsClassName } from './classnames'

export function FormActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(formActionsClassName, className)} {...props} />
}
