import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export function TableNumericColumns() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell className="w-1/2">Stop</TableHeadCell>
          <TableHeadCell>Nights</TableHeadCell>
          <TableHeadCell>Cost</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Kyoto</TableCell>
          <TableCell className="text-right">3</TableCell>
          <TableCell className="text-right">¥48,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kanazawa</TableCell>
          <TableCell className="text-right">2</TableCell>
          <TableCell className="text-right">¥26,500</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">5</TableCell>
          <TableCell className="text-right">¥74,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
