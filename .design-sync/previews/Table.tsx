import {
  Button,
  ButtonSize,
  ButtonVariant,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeadCell,
  TableHeadCellScope,
  TableHeader,
  TableRow,
} from 'flyingsalmon'

export function Itinerary() {
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

export function Interactive() {
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
          <TableCell>
            <a href="#ryokan-aoi">Ryokan Aoi</a>
          </TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Save
            </Button>
          </TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell rowLink>
            <a href="#kanazawa">Kanazawa</a>
          </TableCell>
          <TableCell>
            <a href="#hotel-higashi">Hotel Higashi</a>
          </TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Save
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export function Costs() {
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
          <TableCell className="text-right">&yen;48,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kanazawa</TableCell>
          <TableCell className="text-right">2</TableCell>
          <TableCell className="text-right">&yen;26,500</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">5</TableCell>
          <TableCell className="text-right">&yen;74,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export function RowHeaders() {
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
