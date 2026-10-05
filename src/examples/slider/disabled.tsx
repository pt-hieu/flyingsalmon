import { Slider } from '@/registry/ui/slider'

export function SliderDisabled() {
  return (
    <Slider
      className="w-full"
      label="Nightly budget"
      min={50}
      max={300}
      step={50}
      value={200}
      description="Up to $200 a night, set by the organiser"
      disabled
      onValueChange={() => {}}
    />
  )
}
