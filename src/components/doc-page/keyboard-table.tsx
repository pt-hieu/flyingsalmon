import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

import {
  keyboardKeyCellClassName,
  keyboardKeyClassName,
  keyboardKeyListClassName,
  tableTextCellClassName,
} from './classnames'
import type { KeyboardRow } from './types'

export interface KeyboardTableProps {
  rows: KeyboardRow[]
}

export function KeyboardTable({ rows }: KeyboardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Key</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.keys.join(' ')}>
            <TableCell className={keyboardKeyCellClassName}>
              <span className={keyboardKeyListClassName}>
                {row.keys.map((key) => (
                  <kbd key={key} className={keyboardKeyClassName}>
                    {key}
                  </kbd>
                ))}
              </span>
            </TableCell>
            <TableCell className={tableTextCellClassName}>
              {row.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
