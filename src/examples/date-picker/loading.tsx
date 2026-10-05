import { getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'

import { DatePicker } from '@/registry/ui/date-picker'

export function DatePickerLoading() {
  const [departure, setDeparture] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string>()

  async function checkFlights(nextDeparture: string | null) {
    setDeparture(nextDeparture)
    setError(undefined)

    if (!nextDeparture) return

    setChecking(true)
    const hasSeats = await hasFlightsOn(nextDeparture)
    setError(hasSeats ? undefined : 'That flight is sold out')
    setChecking(false)
  }

  return (
    <DatePicker
      className="w-64"
      label="Departure"
      description="Pick any day. Mondays are sold out."
      value={departure}
      onChange={checkFlights}
      min={today(getLocalTimeZone()).toString()}
      loading={checking}
      error={error}
    />
  )
}

async function hasFlightsOn(departure: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return new Date(`${departure}T00:00:00`).getDay() !== 1
}
