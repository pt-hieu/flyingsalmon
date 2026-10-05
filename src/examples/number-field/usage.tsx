import { useState } from 'react'

import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldUsage() {
  const [travellers, setTravellers] = useState<number | null>(2)

  return (
    <NumberField
      label="Travellers"
      value={travellers}
      onValueChange={setTravellers}
      min={1}
    />
  )
}
