import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  comboboxChipClassName,
  comboboxChipRemoveClassName,
} from './classnames'

export interface ComboboxChipProps extends React.ComponentProps<'span'> {
  onRemove: () => void
  children: string
}

export function ComboboxChip({
  onRemove,
  className,
  children,
  ...props
}: ComboboxChipProps) {
  return (
    <span className={cn(comboboxChipClassName, className)} {...props}>
      {children}

      <span
        aria-hidden
        className={comboboxChipRemoveClassName}
        onClick={(event) => {
          event.stopPropagation()
          onRemove()
        }}
      >
        <X />
      </span>
    </span>
  )
}
