import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export function TableEmpty() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Traveller</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Joined</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-muted-foreground">
            Nobody has joined this trip yet. Invite someone to start planning
            together.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
