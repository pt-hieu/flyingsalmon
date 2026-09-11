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
  icon?: React.ReactNode
  children: string
}

export function SelectItem({
  icon,
  className,
  children,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(selectItemClassName, className)}
      {...props}
    >
      {icon ? (
        <span aria-hidden className={selectItemIconSlotClassName}>
          {icon}
        </span>
      ) : null}

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
