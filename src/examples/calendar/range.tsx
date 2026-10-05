import { getLocalTimeZone, today } from '@internationalized/date'
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
          ? `Brian Nguyen travels ${tripDates.start} to ${tripDates.end}.`
          : 'No trip dates picked.'}
      </p>
    </div>
  )
}
