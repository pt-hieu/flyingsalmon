import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'
import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button } from '@/registry/ui/button'
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
    <Form
      className="w-full max-w-sm"
      onSubmit={planTrip}
      result={
        plannedTrip ? (
          <Alert variant={AlertVariant.Success}>
            <AlertTitle>{plannedTrip.placeName}</AlertTitle>
            <AlertDescription>
              {plannedTrip.start
                ? `${formatDate(plannedTrip.start)} to ${formatDate(plannedTrip.end)}`
                : 'Dates to be decided'}
            </AlertDescription>
          </Alert>
        ) : null
      }
    >
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
  )
}

const dateFormatter = new DateFormatter('en-US', { dateStyle: 'medium' })

function formatDate(isoDate: string) {
  return dateFormatter.format(parseDate(isoDate).toDate(getLocalTimeZone()))
}
