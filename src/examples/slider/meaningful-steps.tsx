import { useState } from 'react'

import { Slider } from '@/registry/ui/slider'

const paceLevels = [
  'Slow mornings, one plan a day',
  'Two plans a day, long lunches',
  'Packed days, early starts',
]

export function SliderMeaningfulSteps() {
  const [paceLevel, setPaceLevel] = useState(1)

  return (
    <Slider
      className="w-full"
      label="Pace"
      min={0}
      max={paceLevels.length - 1}
      value={paceLevel}
      description={paceLevels[paceLevel]}
      onValueChange={setPaceLevel}
    />
  )
}
