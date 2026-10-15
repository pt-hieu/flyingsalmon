import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { useState } from 'react'

import { Calendar, CalendarMode } from '@/registry/ui/calendar'
import type { CalendarRange } from '@/registry/ui/calendar'

const localToday = today(getLocalTimeZone())

export function CalendarRangeExample() {
  const [tripDates, setTripDates] = useState<CalendarRange | null>({
    start: localToday.add({ days: 9 }).toString(),
    end: localToday.add({ days: 16 }).toString(),
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Trip dates"
        mode={CalendarMode.Range}
        months={2}
        value={tripDates}
        onChange={setTripDates}
      />
      <p className="text-muted-foreground text-sm">
        {tripDates
          ? `Brian Nguyen travels ${formatDate(tripDates.start)} to ${formatDate(tripDates.end)}.`
          : 'No trip dates picked.'}
      </p>
    </div>
  )
}

const dateFormatter = new DateFormatter('en-US', { dateStyle: 'medium' })

function formatDate(isoDate: string) {
  return dateFormatter.format(parseDate(isoDate).toDate(getLocalTimeZone()))
}
