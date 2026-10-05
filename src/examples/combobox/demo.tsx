import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

const places = [
  { id: 'place-lisbon', name: 'Lisbon', country: 'Portugal' },
  { id: 'place-hanoi', name: 'Hanoi', country: 'Vietnam' },
  { id: 'place-hakone', name: 'Hakone', country: 'Japan' },
  { id: 'place-reykjavik', name: 'Reykjavík', country: 'Iceland' },
  { id: 'place-da-nang', name: 'Da Nang', country: 'Vietnam' },
]

export function ComboboxDemo() {
  const [placeId, setPlaceId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const matchingPlaces = places.filter((place) =>
    place.name.toLowerCase().startsWith(query.trim().toLowerCase()),
  )

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Where are you going?"
      placeholder="Search a place"
      value={placeId}
      onValueChange={setPlaceId}
      inputValue={query}
      onInputValueChange={setQuery}
    >
      {matchingPlaces.map((place) => (
        <ComboboxItem
          key={place.id}
          value={place.id}
          description={place.country}
        >
          {place.name}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}
