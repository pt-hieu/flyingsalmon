import type { ComponentProps } from 'react'

export enum TableHeadCellScope {
  Col = 'col',
  Row = 'row',
}

export type TableProps = ComponentProps<'table'>

export type TableSectionProps = ComponentProps<'tbody'>

export type TableCellProps = ComponentProps<'td'>
