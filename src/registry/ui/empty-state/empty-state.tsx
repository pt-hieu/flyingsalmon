import { cn } from '@/lib/utils'

import { emptyStateClassName } from './classnames'
import { EmptyStateContext } from './context'
import { EmptyStateSize } from './types'
import { useLabellingTitle } from './use-labelling-title'

export interface EmptyStateProps extends React.ComponentProps<'section'> {
  size?: EmptyStateSize
}

export function EmptyState({
  size = EmptyStateSize.Default,
  className,
  ...props
}: EmptyStateProps) {
  const { defaultTitleId, labellingTitleId, registerTitleId } =
    useLabellingTitle()

  return (
    <EmptyStateContext
      value={{ size, titleId: defaultTitleId, registerTitleId }}
    >
      <section
        data-slot="empty-state"
        aria-labelledby={labellingTitleId}
        className={cn(emptyStateClassName, className)}
        {...props}
      />
    </EmptyStateContext>
  )
}
