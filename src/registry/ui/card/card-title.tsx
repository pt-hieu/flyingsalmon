import { use } from 'react'

import { cn } from '@/lib/utils'

import { cardTitleVariants } from './classnames'
import { CardInteractiveContext } from './context'
import type { CardSlotProps } from './types'

export function CardTitle({ className, ...props }: CardSlotProps) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants({ interactive }), className)}
      {...props}
    />
  )
}
