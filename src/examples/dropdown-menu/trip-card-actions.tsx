import { Copy, Ellipsis, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/registry/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuAlign,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemVariant,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

interface Trip {
  id: number
  name: string
  summary: string
}

const initialTrips: Trip[] = [
  { id: 1, name: 'Kyoto in autumn', summary: '12 to 19 Oct, 3 travellers' },
  { id: 2, name: 'Lisbon long weekend', summary: '3 to 6 Mar, 2 travellers' },
]

export function DropdownMenuTripCardActions() {
  const [trips, setTrips] = useState(initialTrips)
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null)
  const [nextId, setNextId] = useState(3)

  function duplicateTrip(trip: Trip) {
    setTrips((currentTrips) => {
      const index = currentTrips.findIndex(({ id }) => id === trip.id)
      const copy = { ...trip, id: nextId, name: `${trip.name} (copy)` }
      return [
        ...currentTrips.slice(0, index + 1),
        copy,
        ...currentTrips.slice(index + 1),
      ]
    })
    setNextId(nextId + 1)
  }

  function deleteTrip(trip: Trip) {
    setTrips((currentTrips) => currentTrips.filter(({ id }) => id !== trip.id))
    setTripToDelete(null)
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {trips.map((trip) => (
        <Card key={trip.id}>
          <CardHeader className="flex-row items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <CardTitle>{trip.name}</CardTitle>
              <CardDescription>{trip.summary}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant={ButtonVariant.Ghost}
                  size={ButtonSize.IconSmall}
                  aria-label={`Actions for ${trip.name}`}
                  icon={<Ellipsis />}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align={DropdownMenuAlign.End}>
                <DropdownMenuItem
                  icon={<Copy />}
                  onSelect={() => duplicateTrip(trip)}
                >
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  icon={<Trash2 />}
                  variant={DropdownMenuItemVariant.Destructive}
                  onSelect={() => setTripToDelete(trip)}
                >
                  Delete trip
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
        </Card>
      ))}

      {trips.length === 0 ? (
        <Card>
          <CardContent className="text-muted-foreground text-sm">
            No trips left.
          </CardContent>
        </Card>
      ) : null}

      <Dialog
        open={tripToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setTripToDelete(null)
        }}
        dismissible={false}
      >
        <DialogContent>
          <DialogTitle>Delete {tripToDelete?.name}?</DialogTitle>
          <DialogDescription>
            The itinerary goes for every traveller on the trip.
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button variant={ButtonVariant.Outline}>Keep trip</Button>
            </DialogClose>
            <Button
              variant={ButtonVariant.Destructive}
              onClick={() => tripToDelete && deleteTrip(tripToDelete)}
            >
              Delete trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
