import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

const stops = [
  { id: 'kyoto', name: 'Kyoto', nights: 3 },
  { id: 'tokyo', name: 'Tokyo', nights: 4 },
]

export function TripStops() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Nights</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stops.map((stop) => (
          <TableRow key={stop.id}>
            <TableCell>{stop.name}</TableCell>
            <TableCell>{stop.nights}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
