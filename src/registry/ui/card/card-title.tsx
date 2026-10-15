import { use, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { cardTitleVariants } from './classnames'
import { CardInteractiveContext } from './context'
import { CardTitleElement } from './types'

export interface CardTitleProps extends ComponentProps<'h3'> {
  as?: CardTitleElement
}

export function CardTitle({
  as = CardTitleElement.H3,
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
