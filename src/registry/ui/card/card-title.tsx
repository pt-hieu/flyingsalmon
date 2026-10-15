import { use } from 'react'

import { cn } from '@/lib/utils'

import { cardTitleVariants } from './classnames'
import { CardInteractiveContext } from './context'
import { CardTitleElement, type CardSlotProps } from './types'

export interface CardTitleProps extends CardSlotProps {
  as?: CardTitleElement
}

export function CardTitle({
  as = CardTitleElement.Div,
  className,
  ...props
}: CardTitleProps) {
  const interactive = use(CardInteractiveContext)
  const Title: React.ElementType = as

  return (
    <Title
      data-slot="card-title"
      className={cn(cardTitleVariants({ interactive }), className)}
      {...props}
    />
  )
}
