import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

export function ComboboxUsage() {
  const [placeId, setPlaceId] = useState<string | null>(null)

  return (
    <Combobox
      mode={ComboboxMode.Single}
      label="Destination"
      value={placeId}
      onValueChange={setPlaceId}
    >
      <ComboboxItem value="place-lisbon">Lisbon</ComboboxItem>
      <ComboboxItem value="place-hanoi">Hanoi</ComboboxItem>
    </Combobox>
  )
}
