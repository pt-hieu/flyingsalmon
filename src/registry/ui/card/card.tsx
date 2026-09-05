import { cn } from '@/lib/utils'

import { cardVariants } from './classnames'
import { CardInteractiveContext } from './context'
import type { CardSlotProps } from './types'

export interface CardProps extends CardSlotProps {
  interactive?: boolean
}

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <CardInteractiveContext value={interactive}>
      <div
        data-slot="card"
        data-interactive={interactive || undefined}
        className={cn(cardVariants({ interactive }), className)}
        {...props}
      />
    </CardInteractiveContext>
  )
}
