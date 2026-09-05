import { Select as SelectPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { selectLabelClassName } from './classnames'

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(selectLabelClassName, className)}
      {...props}
    />
  )
}
