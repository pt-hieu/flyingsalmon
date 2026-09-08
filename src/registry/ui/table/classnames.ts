import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { TableHeadCellScope } from './types'

export const tableContainerVariants = cva('w-full overflow-x-auto')

export const tableVariants = cva('w-full text-sm')

export const tableHeaderVariants = cva(
  '[&>tr]:border-b [&>tr]:border-b-(--table-header-border)',
)

export const tableBodyVariants = cva(
  cn(
    '[&>tr]:border-border [&>tr]:border-b',
    '[&>tr]:transition-colors [&>tr]:duration-(--motion-fast)',
    '[&>tr[data-interactive]:has([data-row-link]_a:is(:focus-visible,:active))]:border-b-primary',
    '[&>tr:has(+tr[data-interactive]_[data-row-link]_a:is(:focus-visible,:active))]:border-b-primary',
  ),
)

export const tableFooterVariants = cva('font-medium')

export const tableRowVariants = cva('', {
  variants: {
    interactive: {
      true: cn(
        'relative',
        'hover:bg-accent',
        'has-[[data-row-link]_a:is(:focus-visible,:active)]:bg-accent',
        "[&>[data-row-link]_a]:after:absolute [&>[data-row-link]_a]:after:inset-0 [&>[data-row-link]_a]:after:content-['']",
        '[&>[data-row-link]_a]:focus-visible:outline-none',
        '[&>:not([data-row-link])_a]:relative [&>:not([data-row-link])_a]:z-10',
        '[&>:not([data-row-link])_button]:relative [&>:not([data-row-link])_button]:z-10',
      ),
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
  },
})

export const tableHeadCellVariants = cva(
  'font-sans align-middle text-left font-medium',
  {
    variants: {
      scope: {
        [TableHeadCellScope.Column]: 'text-foreground h-10 px-4',
        [TableHeadCellScope.Row]: 'text-foreground px-4 py-3',
      },
    },
    defaultVariants: {
      scope: TableHeadCellScope.Column,
    },
  },
)

export const tableCellVariants = cva('px-4 py-3 align-middle')
