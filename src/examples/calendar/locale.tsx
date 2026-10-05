import { getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'

import { Calendar } from '@/registry/ui/calendar'

export function CalendarLocale() {
  const [departure, setDeparture] = useState<string | null>(
    today(getLocalTimeZone()).add({ days: 4 }).toString(),
  )

  return (
    <Calendar
      aria-label="Abreise"
      locale="de-DE"
      value={departure}
      onChange={setDeparture}
    />
  )
}
