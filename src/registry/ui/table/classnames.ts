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
    '[&>tr]:hover:bg-accent',
  ),
)

export const tableFooterVariants = cva('font-medium')

export const tableRowVariants = cva('', {
  variants: {
    interactive: {
      true: cn(
        'relative',
        "[&_a]:after:absolute [&_a]:after:inset-0 [&_a]:after:content-[''] [&_a]:after:rounded-md",
        '[&_a]:after:ring-primary [&_a]:after:ring-0',
        '[&_a]:after:transition-[box-shadow] [&_a]:after:duration-(--motion-fast)',
        '[&_a]:focus-visible:outline-none',
        '[&_a]:focus-visible:after:ring-ring [&_a]:focus-visible:after:ring-2',
        '[&_a]:active:after:ring-primary [&_a]:active:after:ring-2',
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
        [TableHeadCellScope.Col]: 'text-muted-foreground h-10 px-4',
        [TableHeadCellScope.Row]: 'text-foreground px-4 py-3',
      },
    },
    defaultVariants: {
      scope: TableHeadCellScope.Col,
    },
  },
)

export const tableCellVariants = cva('px-4 py-3 align-middle', {
  variants: {
    interactive: {
      true: '[&_button]:relative [&_button]:z-10',
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
  },
})
