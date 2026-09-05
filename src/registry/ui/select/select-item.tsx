import { Check } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import {
  selectItemClassName,
  selectItemIconSlotClassName,
  selectItemIndicatorIconClassName,
  selectItemTextClassName,
} from './classnames'

export interface SelectItemProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.Item>,
  'children' | 'textValue'
> {
  children: string
}

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(selectItemClassName, className)}
      {...props}
    >
      <span className={selectItemTextClassName}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>

      <span className={selectItemIconSlotClassName}>
        <SelectPrimitive.ItemIndicator>
          <Check aria-hidden className={selectItemIndicatorIconClassName} />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}
