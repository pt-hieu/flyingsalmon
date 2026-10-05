import { useState } from 'react'

import { Button } from '@/registry/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'
import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'
import type { DatePickerRange } from '@/registry/ui/date-picker'
import { Form, FormActions } from '@/registry/ui/form'

const places = [
  { id: 'place-lisbon', name: 'Lisbon' },
  { id: 'place-hanoi', name: 'Hanoi' },
  { id: 'place-da-nang', name: 'Da Nang' },
]

interface PlannedTrip {
  placeName: string
  start: string
  end: string
}

export function ComboboxInAForm() {
  const [placeId, setPlaceId] = useState<string | null>(null)
  const [dates, setDates] = useState<DatePickerRange | null>(null)
  const [placeError, setPlaceError] = useState<string>()
  const [plannedTrip, setPlannedTrip] = useState<PlannedTrip | null>(null)

  function planTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const place = places.find(
      (knownPlace) => knownPlace.id === formData.get('placeId'),
    )

    if (!place) {
      setPlaceError('Choose where you are going')
      return
    }

    setPlannedTrip({
      placeName: place.name,
      start: String(formData.get('start') ?? ''),
      end: String(formData.get('end') ?? ''),
    })
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {plannedTrip ? (
        <Card>
          <CardHeader>
            <CardTitle>{plannedTrip.placeName}</CardTitle>
            <CardDescription>
              {plannedTrip.start
                ? `${plannedTrip.start} to ${plannedTrip.end}`
                : 'Dates to be decided'}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Form onSubmit={planTrip}>
        <Combobox
          mode={ComboboxMode.Single}
          name="placeId"
          required
          label="Destination"
          placeholder="Search a place"
          error={placeError}
          value={placeId}
          onValueChange={(nextPlaceId) => {
            setPlaceId(nextPlaceId)
            setPlaceError(undefined)
          }}
        >
          {places.map((place) => (
            <ComboboxItem key={place.id} value={place.id}>
              {place.name}
            </ComboboxItem>
          ))}
        </Combobox>

        <DatePicker
          mode={DatePickerMode.Range}
          label="Dates"
          startName="start"
          endName="end"
          value={dates}
          onChange={setDates}
        />

        <FormActions>
          <Button type="submit">Plan trip</Button>
        </FormActions>
      </Form>
    </div>
  )
}
