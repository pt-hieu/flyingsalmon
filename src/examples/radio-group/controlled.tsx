import { useState } from 'react'

import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'

const costSplitOptions = [
  { value: 'evenly', label: 'Split evenly' },
  { value: 'itinerary', label: 'By what each traveller joins' },
  { value: 'organiser', label: 'Organiser pays' },
]

export function RadioGroupControlled() {
  const [costSplit, setCostSplit] = useState('evenly')
  const costSplitLabel = costSplitOptions.find(
    (option) => option.value === costSplit,
  )?.label

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        label="Cost split"
        name="costSplit"
        value={costSplit}
        onValueChange={setCostSplit}
      >
        {costSplitOptions.map((option) => (
          <RadioGroupItem
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <p className="text-muted-foreground text-sm">
        Brian Nguyen chose: {costSplitLabel?.toLowerCase()}.
      </p>
    </div>
  )
}
