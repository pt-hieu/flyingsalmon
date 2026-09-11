import { cn } from '@/lib/utils'

import { comboboxSeparatorClassName } from './classnames'

export function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      role="separator"
      className={cn(comboboxSeparatorClassName, className)}
      {...props}
    />
  )
}
