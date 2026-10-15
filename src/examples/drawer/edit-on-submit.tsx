import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'
import { Pencil } from 'lucide-react'
import { useId, useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTitleElement,
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
import { Form } from '@/registry/ui/form'
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

  function changeOpen(nextOpen: boolean) {
    setDraftName(tripName)
    setDraftDates(dates)
    setOpen(nextOpen)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle as={CardTitleElement.H4}>{tripName}</CardTitle>
        <CardDescription>
          {dates
            ? `${formatDate(dates.start)} to ${formatDate(dates.end)}`
            : 'Dates to be decided'}
        </CardDescription>
      </CardHeader>
      <CardAction>
        <Drawer open={open} onOpenChange={changeOpen}>
          <DrawerTrigger>
            <Button variant={ButtonVariant.Outline} icon={<Pencil />}>
              Edit trip
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Edit the trip</DrawerTitle>
            <DrawerDescription>
              Saving closes the panel and updates the card.
            </DrawerDescription>
            <DrawerBody>
              <Form id={formId} onSubmit={saveTrip} className="gap-4">
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
              </Form>
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

const dateFormatter = new DateFormatter('en-US', { dateStyle: 'medium' })

function formatDate(isoDate: string) {
  return dateFormatter.format(parseDate(isoDate).toDate(getLocalTimeZone()))
}
