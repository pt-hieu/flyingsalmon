import { getLocalTimeZone, today } from '@internationalized/date'

import { Calendar } from '@/registry/ui/calendar'

export function CalendarReadOnly() {
  return (
    <Calendar
      aria-label="Booked departure"
      value={today(getLocalTimeZone()).add({ days: 3 }).toString()}
      readOnly
    />
  )
}
