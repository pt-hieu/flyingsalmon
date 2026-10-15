import {
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { useRef, useState } from 'react'

import { DatePicker } from '@/registry/ui/date-picker'

export function DatePickerLoading() {
  const [departure, setDeparture] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string>()
  const latestCheck = useRef(0)

  async function checkFlights(nextDeparture: string | null) {
    latestCheck.current += 1
    const checkNumber = latestCheck.current

    setDeparture(nextDeparture)
    setError(undefined)

    if (!nextDeparture) {
      setChecking(false)
      return
    }

    setChecking(true)

    try {
      const hasSeats = await hasFlightsOn(nextDeparture)

      if (checkNumber === latestCheck.current) {
        setError(hasSeats ? undefined : 'That flight is sold out')
      }
    } finally {
      if (checkNumber === latestCheck.current) setChecking(false)
    }
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
  return getDayOfWeek(parseDate(departure), 'en-US') !== 1
}
