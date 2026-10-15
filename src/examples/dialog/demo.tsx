import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTitleElement,
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
import { Form } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'

interface Trip {
  id: string
  destination: string
  dates: DatePickerRange | null
}

export function DialogDemo() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 'trip-hanoi',
      destination: 'Hanoi',
      dates: { start: '2026-03-03', end: '2026-03-09' },
    },
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

    setTrips((currentTrips) => [
      { id: crypto.randomUUID(), destination, dates },
      ...currentTrips,
    ])
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
            <Form id={formId} onSubmit={planTrip} className="gap-4">
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
            </Form>
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

      {trips.map((trip) => (
        <Card key={trip.id}>
          <CardHeader>
            <CardTitle as={CardTitleElement.H2}>{trip.destination}</CardTitle>
            <CardDescription>
              {trip.dates
                ? `${formatDate(trip.dates.start)} to ${formatDate(trip.dates.end)}`
                : 'Dates to be decided'}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

const dateFormatter = new DateFormatter('en-US', { dateStyle: 'medium' })

function formatDate(isoDate: string) {
  return dateFormatter.format(parseDate(isoDate).toDate(getLocalTimeZone()))
}
