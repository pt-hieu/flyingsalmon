import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

import {
  propRequiredClassName,
  tableCodeCellClassName,
  tableGroupClassName,
  tableTextCellClassName,
  tableTitleClassName,
} from './classnames'
import type { PropRow } from './types'

export interface PropsTableProps {
  component: string
  description?: React.ReactNode
  rows: PropRow[]
}

export function PropsTable({ component, description, rows }: PropsTableProps) {
  return (
    <div className={tableGroupClassName}>
      <h3 className={tableTitleClassName}>
        <code>{component}</code>
      </h3>

      {description ? <p>{description}</p> : null}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Prop</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Default</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={tableCodeCellClassName}>
                {row.name}
              </TableCell>
              <TableCell className={tableCodeCellClassName}>
                {row.type}
              </TableCell>
              <TableCell className={tableCodeCellClassName}>
                {row.required ? (
                  <span className={propRequiredClassName}>Required</span>
                ) : (
                  (row.default ?? '–')
                )}
              </TableCell>
              <TableCell className={tableTextCellClassName}>
                {row.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
