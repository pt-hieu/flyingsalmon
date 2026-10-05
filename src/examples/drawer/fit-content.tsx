import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/ui/drawer'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

const stops = [
  {
    city: 'Kyoto',
    arrival: '12 Oct',
    nights: 3,
    lodging: 'Ryokan Aoi',
    total: '€620',
  },
  {
    city: 'Kanazawa',
    arrival: '15 Oct',
    nights: 2,
    lodging: 'Hotel Higashi',
    total: '€380',
  },
  {
    city: 'Tokyo',
    arrival: '17 Oct',
    nights: 4,
    lodging: 'Shinjuku Loft',
    total: '€910',
  },
]

export function DrawerFitContent() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Open the itinerary</Button>
      </DrawerTrigger>
      <DrawerContent fitContent>
        <DrawerTitle>Itinerary</DrawerTitle>
        <DrawerDescription>
          The panel takes the width the table asks for.
        </DrawerDescription>
        <DrawerBody>
          <div className="w-128">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadCell>Stop</TableHeadCell>
                  <TableHeadCell>Arrival</TableHeadCell>
                  <TableHeadCell>Nights</TableHeadCell>
                  <TableHeadCell>Lodging</TableHeadCell>
                  <TableHeadCell>Total</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stops.map((stop) => (
                  <TableRow key={stop.city}>
                    <TableCell>{stop.city}</TableCell>
                    <TableCell>{stop.arrival}</TableCell>
                    <TableCell>{stop.nights}</TableCell>
                    <TableCell>{stop.lodging}</TableCell>
                    <TableCell>{stop.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
