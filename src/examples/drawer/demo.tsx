import { ListFilter } from 'lucide-react'
import { useState } from 'react'

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
import { Input } from '@/registry/ui/input'

const trips = [
  { destination: 'Kyoto', summary: '12 to 19 Oct, 3 travellers' },
  { destination: 'Lisbon', summary: '3 to 6 Mar, 2 travellers' },
  { destination: 'Hanoi', summary: '20 to 27 Apr, 4 travellers' },
  { destination: 'Da Nang', summary: '1 to 8 Aug, 2 travellers' },
]

export function DrawerDemo() {
  const [destinationFilter, setDestinationFilter] = useState('')

  const visibleTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(destinationFilter.toLowerCase()),
  )

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Drawer>
        <DrawerTrigger>
          <Button variant={ButtonVariant.Outline} icon={<ListFilter />}>
            Filter trips
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Filter trips</DrawerTitle>
          <DrawerDescription>
            The list narrows as you type and stays in view beside this panel.
          </DrawerDescription>
          <DrawerBody>
            <Input
              label="Destination"
              placeholder="Kyoto"
              value={destinationFilter}
              onChange={(event) => setDestinationFilter(event.target.value)}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant={ButtonVariant.Outline}
              onClick={() => setDestinationFilter('')}
            >
              Clear
            </Button>
            <DrawerClose>
              <Button>Show {visibleTrips.length} trips</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ul className="flex flex-col gap-2">
        {visibleTrips.map((trip) => (
          <li key={trip.destination} className="text-sm">
            <span className="font-medium">{trip.destination}</span>
            <span className="text-muted-foreground"> · {trip.summary}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
