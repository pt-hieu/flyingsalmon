import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupMode,
  ToggleGroupSize,
} from 'flyingsalmon'
import { Coffee, Landmark, Mountain, Music } from 'lucide-react'

export function Single() {
  return (
    <ToggleGroup label="Activity type" defaultValue="food">
      <ToggleGroupItem value="food" icon={<Coffee />}>
        Food
      </ToggleGroupItem>
      <ToggleGroupItem value="museums" icon={<Landmark />}>
        Museums
      </ToggleGroupItem>
      <ToggleGroupItem value="hikes" icon={<Mountain />}>
        Hikes
      </ToggleGroupItem>
      <ToggleGroupItem value="nightlife" icon={<Music />}>
        Nightlife
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function Multiple() {
  return (
    <ToggleGroup
      label="Pick up to 3"
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

export function RequiredWithError() {
  return (
    <div className="flex flex-col gap-8">
      <ToggleGroup label="Trip pace" required defaultValue="steady">
        <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
        <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
        <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        label="Trip pace"
        required
        error="Pick a pace before generating"
      >
        <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
        <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
        <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-8">
      <ToggleGroup label="Default, 36px" defaultValue="food">
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
        <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        label="Small, 32px"
        size={ToggleGroupSize.Small}
        defaultValue="food"
      >
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
        <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
