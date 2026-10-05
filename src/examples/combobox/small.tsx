import { useState } from 'react'

import {
  Combobox,
  ComboboxItem,
  ComboboxMode,
  ComboboxSize,
} from '@/registry/ui/combobox'

export function ComboboxSmall() {
  const [interestIds, setInterestIds] = useState<string[]>(['food'])

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Multiple}
      size={ComboboxSize.Small}
      label="Filter by interest"
      placeholder="Add an interest"
      value={interestIds}
      onValueChange={setInterestIds}
    >
      <ComboboxItem value="food">Food and drink</ComboboxItem>
      <ComboboxItem value="museums">Museums</ComboboxItem>
      <ComboboxItem value="hiking">Hiking</ComboboxItem>
    </Combobox>
  )
}
