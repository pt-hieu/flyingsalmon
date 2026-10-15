import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

const stops = [
  { id: 'kyoto', name: 'Kyoto', lodging: 'Ryokan Aoi' },
  { id: 'kanazawa', name: 'Kanazawa', lodging: 'Hotel Higashi' },
]

export function TableInteractiveRows() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Lodging</TableHeadCell>
          <TableHeadCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {stops.map((stop) => (
          <TableRow key={stop.id} interactive>
            <TableCell rowLink>
              <a href={`#${stop.id}`}>{stop.name}</a>
            </TableCell>
            <TableCell>{stop.lodging}</TableCell>
            <TableCell className="text-right">
              <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
                Share
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
