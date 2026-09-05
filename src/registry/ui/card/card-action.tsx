import { use } from 'react'

import { cn } from '@/lib/utils'

import { cardActionVariants } from './classnames'
import { CardInteractiveContext } from './context'
import type { CardSlotProps } from './types'

export function CardAction({ className, ...props }: CardSlotProps) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-action"
      className={cn(cardActionVariants({ interactive }), className)}
      {...props}
    />
  )
}
