import { useState } from 'react'

import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'

const costSplitLabels: Record<string, string> = {
  evenly: 'Split evenly',
  itinerary: 'By what each traveller joins',
  organiser: 'Organiser pays',
}

export function RadioGroupControlled() {
  const [costSplit, setCostSplit] = useState('evenly')

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        label="Cost split"
        name="costSplit"
        value={costSplit}
        onValueChange={setCostSplit}
      >
        {Object.entries(costSplitLabels).map(([value, label]) => (
          <RadioGroupItem key={value} value={value} label={label} />
        ))}
      </RadioGroup>
      <p className="text-muted-foreground text-sm">
        Brian Nguyen chose: {costSplitLabels[costSplit].toLowerCase()}.
      </p>
    </div>
  )
}
