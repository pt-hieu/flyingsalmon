import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

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
        <TableRow interactive>
          <TableCell rowLink>
            <a href="#kyoto">Kyoto</a>
          </TableCell>
          <TableCell>Ryokan Aoi</TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Share
            </Button>
          </TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell rowLink>
            <a href="#kanazawa">Kanazawa</a>
          </TableCell>
          <TableCell>Hotel Higashi</TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Share
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
