import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

const interests = [
  { id: 'food', name: 'Food and drink' },
  { id: 'museums', name: 'Museums' },
  { id: 'hiking', name: 'Hiking' },
  { id: 'nightlife', name: 'Nightlife' },
  { id: 'beaches', name: 'Beaches' },
]

export function ComboboxMultiple() {
  const [interestIds, setInterestIds] = useState<string[]>(['museums'])

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Multiple}
      label="What do you want to do?"
      placeholder="Add an interest"
      value={interestIds}
      onValueChange={setInterestIds}
    >
      {interests.map((interest) => (
        <ComboboxItem key={interest.id} value={interest.id}>
          {interest.name}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}
