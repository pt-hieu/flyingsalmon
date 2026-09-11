import { cn } from '@/lib/utils'

import { comboboxLabelClassName } from './classnames'

export function ComboboxLabel({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(comboboxLabelClassName, className)} {...props} />
}
