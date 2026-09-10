import { X } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springSettle } from '@/registry/lib/motion'

import {
  comboboxChipClassName,
  comboboxChipRemoveClassName,
} from './classnames'

export interface ComboboxChipProps extends React.ComponentProps<
  typeof motion.span
> {
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
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: springSettle }}
      exit={{ opacity: 0, scale: 0.9, transition: springSettle }}
      className={cn(comboboxChipClassName, className)}
      {...props}
    >
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
    </motion.span>
  )
}
