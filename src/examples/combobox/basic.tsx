import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

const departureCities = [
  { id: 'city-london', name: 'London' },
  { id: 'city-manchester', name: 'Manchester' },
  { id: 'city-edinburgh', name: 'Edinburgh' },
  { id: 'city-bristol', name: 'Bristol' },
]

export function ComboboxBasic() {
  const [cityId, setCityId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const matchingCities = departureCities.filter((city) =>
    city.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Departure city"
      placeholder="Search a city"
      value={cityId}
      onValueChange={setCityId}
      inputValue={query}
      onInputValueChange={setQuery}
    >
      {matchingCities.map((city) => (
        <ComboboxItem key={city.id} value={city.id}>
          {city.name}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}
