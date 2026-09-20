import { motion } from 'motion/react'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

import {
  paginationIndicatorClassName,
  paginationInertItemClassName,
  paginationItemVariants,
} from './classnames'
import type { PaginationPageLinkRenderer } from './types'

export interface PaginationItemProps {
  label: string
  targetPage: number
  current?: boolean
  disabled?: boolean
  renderPageLink?: PaginationPageLinkRenderer
  onActivate: (page: number) => void
  children: React.ReactNode
}

export function PaginationItem({
  label,
  targetPage,
  current = false,
  disabled = false,
  renderPageLink,
  onActivate,
  children,
}: PaginationItemProps) {
  const content = (
    <>
      {children}
      {current ? (
        <motion.span
          layoutId="pagination-current-indicator"
          transition={springBounce}
          className={paginationIndicatorClassName}
        />
      ) : null}
    </>
  )

  if (renderPageLink && disabled) {
    return (
      <span
        className={cn(
          paginationItemVariants({ current }),
          paginationInertItemClassName,
        )}
      >
        {children}
      </span>
    )
  }

  if (renderPageLink) {
    return (
      <Slot.Root
        aria-label={label}
        aria-current={current ? 'page' : undefined}
        className={paginationItemVariants({ current })}
      >
        {renderPageLink(targetPage, content)}
      </Slot.Root>
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      disabled={disabled}
      onClick={() => onActivate(targetPage)}
      className={paginationItemVariants({ current })}
    >
      {content}
    </button>
  )
}
