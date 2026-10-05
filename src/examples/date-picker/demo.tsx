import { getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'

import { DatePicker } from '@/registry/ui/date-picker'

const localToday = today(getLocalTimeZone())

export function DatePickerDemo() {
  const [departure, setDeparture] = useState<string | null>(
    localToday.add({ days: 3 }).toString(),
  )

  return (
    <DatePicker
      className="w-64"
      label="Departure"
      name="departure"
      value={departure}
      onChange={setDeparture}
      min={localToday.toString()}
    />
  )
}
