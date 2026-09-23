import { cn } from '@/lib/utils'

import { Tooltip } from '../tooltip'
import { iconTooltipClassName } from './classnames'

export interface IconTooltipProps {
  content: string
  className?: string
  children: React.ReactNode
}

export function IconTooltip({
  content,
  className,
  children,
}: IconTooltipProps) {
  return (
    <Tooltip content={content}>
      <span
        tabIndex={0}
        role="img"
        aria-label={content}
        className={cn(iconTooltipClassName, className)}
      >
        {children}
      </span>
    </Tooltip>
  )
}
