import { use } from 'react'

import { cn } from '@/lib/utils'

import { cardFooterVariants } from './classnames'
import { CardInteractiveContext } from './context'
import type { CardSlotProps } from './types'

export function CardFooter({ className, ...props }: CardSlotProps) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ interactive }), className)}
      {...props}
    />
  )
}
