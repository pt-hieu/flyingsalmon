import { Coffee, Landmark, Mountain, Music } from 'lucide-react'
import { useState } from 'react'

import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group'

export function ToggleGroupSingle() {
  const [selectedActivity, setSelectedActivity] = useState('food')

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        label="Activity type"
        value={selectedActivity}
        onValueChange={setSelectedActivity}
      >
        <ToggleGroupItem value="food" icon={<Coffee />}>
          Food
        </ToggleGroupItem>
        <ToggleGroupItem value="museums" icon={<Landmark />}>
          Museums
        </ToggleGroupItem>
        <ToggleGroupItem value="hikes" icon={<Mountain />}>
          Hikes
        </ToggleGroupItem>
        <ToggleGroupItem value="nightlife" icon={<Music />}>
          Nightlife
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-muted-foreground text-sm">
        {selectedActivity
          ? `Showing ${selectedActivity} near Alfama.`
          : 'Showing every kind of place near Alfama.'}
      </p>
    </div>
  )
}
