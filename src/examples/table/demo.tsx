import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Nights</TableHeadCell>
          <TableHeadCell>Lodging</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Kyoto</TableCell>
          <TableCell>3</TableCell>
          <TableCell>Ryokan Aoi</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kanazawa</TableCell>
          <TableCell>2</TableCell>
          <TableCell>Hotel Higashi</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tokyo</TableCell>
          <TableCell>4</TableCell>
          <TableCell>Shibuya Loft</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>9</TableCell>
          <TableCell>3 stays</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
