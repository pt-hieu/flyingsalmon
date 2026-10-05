import { useState } from 'react'

import { DatePicker } from '@/registry/ui/date-picker'

export function DatePickerUsage() {
  const [departure, setDeparture] = useState<string | null>(null)

  return (
    <DatePicker label="Departure" value={departure} onChange={setDeparture} />
  )
}
