import { cn } from '@/lib/utils'

import { comboboxEmptyClassName } from './classnames'

export function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      aria-live="polite"
      className={cn(comboboxEmptyClassName, className)}
      {...props}
    />
  )
}
