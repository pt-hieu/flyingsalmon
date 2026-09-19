import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LayoutGroup } from 'motion/react'
import { Fragment, useId } from 'react'

import { cn } from '@/lib/utils'

import {
  paginationClassName,
  paginationCompactLabelClassName,
  paginationEllipsisClassName,
  paginationListClassName,
} from './classnames'
import { PaginationItem } from './pagination-item'
import type {
  PaginationPageLabelFormatter,
  PaginationPageLinkRenderer,
} from './types'
import { defaultPageLabel, pageItemLabel, pageWindow } from './utils'

export interface PaginationProps extends Omit<
  React.ComponentProps<'nav'>,
  'children'
> {
  page: number
  pageCount: number
  onPageChange?: (page: number) => void
  compact?: boolean
  formatPageLabel?: PaginationPageLabelFormatter
  renderPageLink?: PaginationPageLinkRenderer
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  compact = false,
  formatPageLabel = defaultPageLabel,
  renderPageLink,
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  const layoutGroupId = useId()

  if (pageCount <= 1) {
    return null
  }

  const pages = pageWindow(page, pageCount)

  function handleActivate(targetPage: number) {
    if (targetPage === page) {
      return
    }

    onPageChange?.(targetPage)
  }

  return (
    <LayoutGroup id={layoutGroupId}>
      <nav
        aria-label={ariaLabel}
        className={cn(paginationClassName, className)}
        {...props}
      >
        <ul className={paginationListClassName}>
          <li>
            <PaginationItem
              label="Previous page"
              targetPage={page - 1}
              disabled={page <= 1}
              renderPageLink={renderPageLink}
              onActivate={handleActivate}
            >
              <ChevronLeft aria-hidden />
            </PaginationItem>
          </li>

          {compact ? (
            <li>
              <span
                aria-live="polite"
                className={paginationCompactLabelClassName}
              >
                {formatPageLabel(page, pageCount)}
              </span>
            </li>
          ) : (
            pages.map((pageNumber, index) => {
              const hidesPagesBefore =
                index > 0 && pageNumber - pages[index - 1] > 1

              return (
                <Fragment key={pageNumber}>
                  {hidesPagesBefore ? (
                    <li aria-hidden>
                      <span className={paginationEllipsisClassName}>…</span>
                    </li>
                  ) : null}
                  <li>
                    <PaginationItem
                      label={pageItemLabel(pageNumber)}
                      targetPage={pageNumber}
                      current={pageNumber === page}
                      renderPageLink={renderPageLink}
                      onActivate={handleActivate}
                    >
                      {pageNumber}
                    </PaginationItem>
                  </li>
                </Fragment>
              )
            })
          )}

          <li>
            <PaginationItem
              label="Next page"
              targetPage={page + 1}
              disabled={page >= pageCount}
              renderPageLink={renderPageLink}
              onActivate={handleActivate}
            >
              <ChevronRight aria-hidden />
            </PaginationItem>
          </li>
        </ul>
      </nav>
    </LayoutGroup>
  )
}
