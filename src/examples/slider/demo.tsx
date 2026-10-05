import { useState } from 'react'

import { Slider } from '@/registry/ui/slider'

export function SliderDemo() {
  const [nightlyBudget, setNightlyBudget] = useState(150)

  return (
    <Slider
      className="w-full"
      label="Nightly budget"
      min={50}
      max={300}
      step={50}
      value={nightlyBudget}
      description={`Up to $${nightlyBudget} a night`}
      onValueChange={setNightlyBudget}
    />
  )
}
