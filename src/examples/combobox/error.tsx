import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

export function ComboboxError() {
  const [cityId, setCityId] = useState<string | null>(null)

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Departure city"
      placeholder="Search a city"
      error={cityId ? undefined : 'Pick the city you fly from'}
      value={cityId}
      onValueChange={setCityId}
    >
      <ComboboxItem value="city-london">London</ComboboxItem>
      <ComboboxItem value="city-manchester">Manchester</ComboboxItem>
    </Combobox>
  )
}
