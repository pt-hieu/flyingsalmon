import { History, MapPin } from 'lucide-react'
import { useState } from 'react'

import {
  Combobox,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxMode,
  ComboboxSeparator,
} from '@/registry/ui/combobox'

export function ComboboxGroups() {
  const [placeId, setPlaceId] = useState<string | null>(null)

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Where are you going?"
      placeholder="Search a place"
      value={placeId}
      onValueChange={setPlaceId}
    >
      <ComboboxGroup>
        <ComboboxLabel>Recent</ComboboxLabel>
        <ComboboxItem
          value="place-hanoi"
          description="Vietnam"
          icon={<History />}
        >
          Hanoi
        </ComboboxItem>
        <ComboboxItem
          value="place-hakone"
          description="Japan"
          icon={<History />}
        >
          Hakone
        </ComboboxItem>
      </ComboboxGroup>

      <ComboboxSeparator />

      <ComboboxGroup>
        <ComboboxLabel>Popular this month</ComboboxLabel>
        <ComboboxItem
          value="place-lisbon"
          description="Portugal"
          icon={<MapPin />}
        >
          Lisbon
        </ComboboxItem>
        <ComboboxItem
          value="place-reykjavik"
          description="No flights this season"
          icon={<MapPin />}
          disabled
        >
          Reykjavík
        </ComboboxItem>
      </ComboboxGroup>
    </Combobox>
  )
}
