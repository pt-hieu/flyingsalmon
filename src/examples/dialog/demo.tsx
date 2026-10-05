import { Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'
import type { DatePickerRange } from '@/registry/ui/date-picker'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import { Input } from '@/registry/ui/input'

interface Trip {
  destination: string
  dates: DatePickerRange | null
}

export function DialogDemo() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [trips, setTrips] = useState<Trip[]>([
    { destination: 'Hanoi', dates: { start: '2026-03-03', end: '2026-03-09' } },
  ])
  const [destination, setDestination] = useState('')
  const [dates, setDates] = useState<DatePickerRange | null>(null)
  const [destinationError, setDestinationError] = useState<string>()

  function planTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (destination.trim().length === 0) {
      setDestinationError('Where are you going?')
      return
    }

    setTrips([{ destination, dates }, ...trips])
    setOpen(false)
    setDestination('')
    setDates(null)
    setDestinationError(undefined)
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button icon={<Plus />}>Plan a trip</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Plan a trip</DialogTitle>
          <DialogDescription>
            Pick a destination and your dates.
          </DialogDescription>
          <DialogBody>
            <form
              id={formId}
              noValidate
              onSubmit={planTrip}
              className="flex flex-col gap-4"
            >
              <Input
                label="Destination"
                placeholder="Lisbon"
                value={destination}
                error={destinationError}
                onChange={(event) => {
                  setDestination(event.target.value)
                  setDestinationError(undefined)
                }}
              />
              <DatePicker
                label="Dates"
                mode={DatePickerMode.Range}
                value={dates}
                onChange={setDates}
              />
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant={ButtonVariant.Outline}>Cancel</Button>
            </DialogClose>
            <Button type="submit" form={formId}>
              Plan trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {trips.map((trip, index) => (
        <Card key={`${trip.destination}-${index}`}>
          <CardHeader>
            <CardTitle>{trip.destination}</CardTitle>
            <CardDescription>
              {trip.dates
                ? `${trip.dates.start} to ${trip.dates.end}`
                : 'Dates to be decided'}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
