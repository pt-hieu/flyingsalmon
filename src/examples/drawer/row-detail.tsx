import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
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
    nights: 3,
    lodging: 'Ryokan Aoi',
    arrival: '12 Oct',
    total: '€620',
  },
  {
    city: 'Kanazawa',
    nights: 2,
    lodging: 'Hotel Higashi',
    arrival: '15 Oct',
    total: '€380',
  },
  {
    city: 'Tokyo',
    nights: 4,
    lodging: 'Shinjuku Loft',
    arrival: '17 Oct',
    total: '€910',
  },
]

export function DrawerRowDetail() {
  const [selectedStop, setSelectedStop] = useState(stops[0])
  const [open, setOpen] = useState(false)

  function showDetail(stop: (typeof stops)[number]) {
    setSelectedStop(stop)
    setOpen(true)
  }

  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Stop</TableHeadCell>
            <TableHeadCell>Nights</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {stops.map((stop) => (
            <TableRow key={stop.city}>
              <TableCell>{stop.city}</TableCell>
              <TableCell>{stop.nights}</TableCell>
              <TableCell>
                <Button
                  variant={ButtonVariant.Ghost}
                  size={ButtonSize.Small}
                  onClick={() => showDetail(stop)}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerTitle>{selectedStop.city}</DrawerTitle>
          <DrawerDescription>
            {selectedStop.nights} nights from {selectedStop.arrival}
          </DrawerDescription>
          <DrawerBody>
            <dl className="text-sm">
              <div className="border-border flex justify-between border-b py-3">
                <dt className="text-muted-foreground">Lodging</dt>
                <dd>{selectedStop.lodging}</dd>
              </div>
              <div className="border-border flex justify-between border-b py-3">
                <dt className="text-muted-foreground">Arrival</dt>
                <dd>{selectedStop.arrival}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Total</dt>
                <dd>{selectedStop.total}</dd>
              </div>
            </dl>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose>
              <Button variant={ButtonVariant.Outline}>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
