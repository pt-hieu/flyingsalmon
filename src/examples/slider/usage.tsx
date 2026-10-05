import { useState } from 'react'

import { Slider } from '@/registry/ui/slider'

export function SliderUsage() {
  const [nights, setNights] = useState(3)

  return (
    <Slider
      label="Nights"
      min={1}
      max={14}
      value={nights}
      description={`${nights} nights`}
      onValueChange={setNights}
    />
  )
}
