import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupMode,
} from '@/registry/ui/toggle-group'

export function ToggleGroupMax() {
  return (
    <ToggleGroup
      label="Pick up to 3 interests"
      mode={ToggleGroupMode.Multiple}
      max={3}
      defaultValue={['food', 'museums', 'markets']}
    >
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
      <ToggleGroupItem value="markets">Markets</ToggleGroupItem>
      <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      <ToggleGroupItem value="nightlife">Nightlife</ToggleGroupItem>
      <ToggleGroupItem value="beaches">Beaches</ToggleGroupItem>
    </ToggleGroup>
  )
}
