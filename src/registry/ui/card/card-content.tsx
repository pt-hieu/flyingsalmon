import { use } from 'react'

import { cn } from '@/lib/utils'

import { cardContentVariants } from './classnames'
import { CardInteractiveContext } from './context'
import type { CardSlotProps } from './types'

export function CardContent({ className, ...props }: CardSlotProps) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants({ interactive }), className)}
      {...props}
    />
  )
}
