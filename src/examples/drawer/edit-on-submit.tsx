import { Pencil } from 'lucide-react'
import { useId, useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'
import type { DatePickerRange } from '@/registry/ui/date-picker'
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

export function DrawerEditOnSubmit() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [tripName, setTripName] = useState('Kyoto in autumn')
  const [dates, setDates] = useState<DatePickerRange | null>({
    start: '2026-10-12',
    end: '2026-10-19',
  })
  const [draftName, setDraftName] = useState(tripName)
  const [draftDates, setDraftDates] = useState(dates)

  function saveTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTripName(draftName)
    setDates(draftDates)
    setOpen(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{tripName}</CardTitle>
        <CardDescription>
          {dates ? `${dates.start} to ${dates.end}` : 'Dates to be decided'}
        </CardDescription>
      </CardHeader>
      <CardAction>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger>
            <Button
              variant={ButtonVariant.Outline}
              icon={<Pencil />}
              onClick={() => {
                setDraftName(tripName)
                setDraftDates(dates)
              }}
            >
              Edit trip
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Edit the trip</DrawerTitle>
            <DrawerDescription>
              Saving closes the panel and updates the card.
            </DrawerDescription>
            <DrawerBody>
              <form
                id={formId}
                onSubmit={saveTrip}
                className="flex flex-col gap-4"
              >
                <Input
                  label="Trip name"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                />
                <DatePicker
                  label="Dates"
                  mode={DatePickerMode.Range}
                  value={draftDates}
                  onChange={setDraftDates}
                />
              </form>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button variant={ButtonVariant.Outline}>Cancel</Button>
              </DrawerClose>
              <Button type="submit" form={formId}>
                Save trip
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardAction>
    </Card>
  )
}
