import { Select as SelectPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { selectSeparatorClassName } from './classnames'

export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(selectSeparatorClassName, className)}
      {...props}
    />
  )
}
