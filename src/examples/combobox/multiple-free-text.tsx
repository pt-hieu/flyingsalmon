import { useState } from 'react'

import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

const frequentTravellers = [
  { id: 'traveller-brian', name: 'Brian Nguyen' },
  { id: 'traveller-linh', name: 'Linh Tran' },
]

export function ComboboxMultipleFreeText() {
  const [travellers, setTravellers] = useState<string[]>(['traveller-brian'])

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Multiple}
      allowFreeText
      label="Who is coming?"
      placeholder="Type a name and press Enter"
      value={travellers}
      onValueChange={setTravellers}
    >
      {frequentTravellers.map((traveller) => (
        <ComboboxItem key={traveller.id} value={traveller.id}>
          {traveller.name}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}
