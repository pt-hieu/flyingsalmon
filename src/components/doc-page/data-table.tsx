import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

import type { DataTableColumn, DataTableRow } from './types'

export interface DataTableProps {
  columns: DataTableColumn[]
  rows: DataTableRow[]
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeadCell key={column.heading}>{column.heading}</TableHeadCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            {columns.map((column, columnIndex) => (
              <TableCell key={column.heading} className={column.cellClassName}>
                {row.cells[columnIndex]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
