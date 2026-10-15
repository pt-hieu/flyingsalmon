import { use, useLayoutEffect } from 'react'

import { cn } from '@/lib/utils'

import { emptyStateTitleVariants } from './classnames'
import { EmptyStateContext } from './context'
import { EmptyStateTitleElement } from './types'

export interface EmptyStateTitleProps extends React.ComponentProps<'h2'> {
  as?: EmptyStateTitleElement
}

export function EmptyStateTitle({
  as = EmptyStateTitleElement.H2,
  id,
  className,
  ...props
}: EmptyStateTitleProps) {
  const { size, titleId, registerTitleId } = use(EmptyStateContext)
  const headingId = id ?? titleId
  const Heading: React.ElementType = as

  useLayoutEffect(() => {
    registerTitleId?.(headingId)

    return () => registerTitleId?.(undefined)
  }, [headingId, registerTitleId])

  return (
    <Heading
      data-slot="empty-state-title"
      id={headingId}
      className={cn(emptyStateTitleVariants({ size }), className)}
      {...props}
    />
  )
}
