import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

export function ComboboxDescription() {
  const [cityId, setCityId] = useState<string | null>(null)

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Departure city"
      placeholder="Search a city"
      description="Where the trip starts"
      value={cityId}
      onValueChange={setCityId}
    >
      <ComboboxItem value="city-london">London</ComboboxItem>
      <ComboboxItem value="city-manchester">Manchester</ComboboxItem>
    </Combobox>
  )
}
