import { useState } from 'react'

import { Slider } from '@/registry/ui/slider'

export function SliderDisabled() {
  const [nightlyBudget, setNightlyBudget] = useState(200)

  return (
    <Slider
      className="w-full"
      label="Nightly budget"
      min={50}
      max={300}
      step={50}
      value={nightlyBudget}
      description="Up to $200 a night, set by the organiser"
      disabled
      onValueChange={setNightlyBudget}
    />
  )
}
