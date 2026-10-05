import { Badge, BadgeVariant } from '@/registry/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export function BadgeInATableRow() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Trip</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Hanoi in spring</TableCell>
          <TableCell>
            <Badge variant={BadgeVariant.Success}>Booked</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Da Nang with the family</TableCell>
          <TableCell>
            <Badge variant={BadgeVariant.Warning}>Needs a passport</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kyoto in autumn</TableCell>
          <TableCell>
            <Badge variant={BadgeVariant.Secondary}>Draft</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
