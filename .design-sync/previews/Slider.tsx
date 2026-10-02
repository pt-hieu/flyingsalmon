import { Slider } from 'flyingsalmon'
import { useState } from 'react'

const paceLevels = [
  'Slow mornings, one plan a day',
  'Two plans a day, long lunches',
  'Packed days, early starts',
]

export function Stepped() {
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

export function Disabled() {
  return (
    <Slider
      className="w-full"
      label="Pace"
      min={0}
      max={paceLevels.length - 1}
      value={1}
      description={paceLevels[1]}
      disabled
      onValueChange={() => {}}
    />
  )
}
