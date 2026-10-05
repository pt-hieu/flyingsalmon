import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group'

export function ToggleGroupError() {
  return (
    <ToggleGroup
      label="Trip pace"
      required
      error="Pick a pace before generating the itinerary"
    >
      <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
      <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
      <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
    </ToggleGroup>
  )
}
