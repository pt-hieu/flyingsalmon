import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeadCellScope,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export function TableRowHeaders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Arrive</TableHeadCell>
          <TableHeadCell>Depart</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeadCell scope={TableHeadCellScope.Row}>Kyoto</TableHeadCell>
          <TableCell>12 Apr</TableCell>
          <TableCell>15 Apr</TableCell>
        </TableRow>
        <TableRow>
          <TableHeadCell scope={TableHeadCellScope.Row}>Kanazawa</TableHeadCell>
          <TableCell>15 Apr</TableCell>
          <TableCell>17 Apr</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
