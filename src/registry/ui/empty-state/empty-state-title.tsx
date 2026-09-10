import { use } from 'react'

import { cn } from '@/lib/utils'

import { emptyStateTitleVariants } from './classnames'
import { EmptyStateContext } from './context'
import { EmptyStateTitleElement } from './types'

export interface EmptyStateTitleProps extends React.ComponentProps<'h2'> {
  as?: EmptyStateTitleElement
}

export function EmptyStateTitle({
  as = EmptyStateTitleElement.H2,
  className,
  ...props
}: EmptyStateTitleProps) {
  const { size, titleId } = use(EmptyStateContext)
  const Heading: React.ElementType = as

  return (
    <Heading
      data-slot="empty-state-title"
      id={titleId}
      className={cn(emptyStateTitleVariants({ size }), className)}
      {...props}
    />
  )
}
