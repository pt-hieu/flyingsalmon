import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

const places = [
  { id: 'place-lisbon', name: 'Lisbon' },
  { id: 'place-hanoi', name: 'Hanoi' },
  { id: 'place-hakone', name: 'Hakone' },
]

export function ComboboxFreeText() {
  const [destination, setDestination] = useState<string | null>(null)

  return (
    <div className="flex w-72 flex-col gap-2">
      <Combobox
        mode={ComboboxMode.Single}
        allowFreeText
        label="Destination"
        placeholder="Anywhere you like"
        value={destination}
        onValueChange={setDestination}
      >
        {places.map((place) => (
          <ComboboxItem key={place.id} value={place.id}>
            {place.name}
          </ComboboxItem>
        ))}
      </Combobox>

      <p className="text-muted-foreground text-sm">
        {describeDestination(destination)}
      </p>
    </div>
  )
}

function describeDestination(destination: string | null) {
  if (destination === null) return 'No destination yet'

  const pickedPlace = places.find((place) => place.id === destination)

  if (pickedPlace) return `A known place, keyed ${pickedPlace.id}`

  return `Your own words: ${destination}`
}
