import { use } from 'react'

import { cn } from '@/lib/utils'

import { cardDescriptionVariants } from './classnames'
import { CardInteractiveContext } from './context'
import type { CardSlotProps } from './types'

export function CardDescription({ className, ...props }: CardSlotProps) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-description"
      className={cn(cardDescriptionVariants({ interactive }), className)}
      {...props}
    />
  )
}
