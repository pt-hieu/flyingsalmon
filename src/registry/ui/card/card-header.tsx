import { cn } from '@/lib/utils'

import { cardHeaderVariants } from './classnames'
import type { CardSlotProps } from './types'

export function CardHeader({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants(), className)}
      {...props}
    />
  )
}
