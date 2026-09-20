import {
  Button,
  ButtonSize,
  ButtonVariant,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from 'flyingsalmon'

const tripStops = [
  {
    stop: 'Kyoto',
    nights: 3,
    lodging: 'Ryokan Aoi',
    arrival: '12 Oct',
    total: '€620',
  },
  {
    stop: 'Kanazawa',
    nights: 2,
    lodging: 'Hotel Higashi',
    arrival: '15 Oct',
    total: '€380',
  },
]

export function FilterPanel() {
  return (
    <Drawer defaultOpen>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Filter trips</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Filter trips</DrawerTitle>
        <DrawerDescription>
          The list you are filtering stays on screen beside the panel.
        </DrawerDescription>
        <DrawerBody>
          <div className="flex flex-col gap-5">
            <Input label="Destination" placeholder="Lisbon" />
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-sm font-medium">Trip length</legend>
              <Checkbox label="A weekend" defaultChecked />
              <Checkbox label="One week" />
              <Checkbox label="Two weeks or more" />
            </fieldset>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Clear</Button>
          </DrawerClose>
          <DrawerClose>
            <Button>Apply</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function RowDetail() {
  const selectedStop = tripStops[0]

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
          {tripStops.map((tripStop) => (
            <TableRow key={tripStop.stop}>
              <TableCell>{tripStop.stop}</TableCell>
              <TableCell>{tripStop.nights}</TableCell>
              <TableCell>
                <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>{selectedStop.stop}</DrawerTitle>
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
            <Button>Edit stop</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function Pending() {
  return (
    <Drawer defaultOpen pending>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Edit the trip</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Edit the trip</DrawerTitle>
        <DrawerDescription>
          Save holds the panel until the operation finishes.
        </DrawerDescription>
        <DrawerBody>
          <div className="flex flex-col gap-4">
            <Input label="Trip name" defaultValue="Autumn in Japan" />
            <Input label="Travellers" defaultValue="2" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DrawerClose>
          <Button loading>Save trip</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
