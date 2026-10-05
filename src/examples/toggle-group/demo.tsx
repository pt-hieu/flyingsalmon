import { useState } from 'react'

import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupMode,
} from '@/registry/ui/toggle-group'

export function ToggleGroupDemo() {
  const [interests, setInterests] = useState(['food', 'museums'])

  return (
    <ToggleGroup
      label="Interests"
      mode={ToggleGroupMode.Multiple}
      value={interests}
      onValueChange={setInterests}
    >
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
      <ToggleGroupItem value="markets">Markets</ToggleGroupItem>
      <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      <ToggleGroupItem value="nightlife">Nightlife</ToggleGroupItem>
    </ToggleGroup>
  )
}
