import type { ComponentProps } from 'react'

export enum TableHeadCellScope {
  Column = 'col',
  Row = 'row',
}

export type TableSectionProps = ComponentProps<'tbody'>
