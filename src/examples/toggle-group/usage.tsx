import { useState } from 'react'

import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group'

export function ToggleGroupUsage() {
  const [activity, setActivity] = useState('food')

  return (
    <ToggleGroup label="Activity" value={activity} onValueChange={setActivity}>
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
    </ToggleGroup>
  )
}
