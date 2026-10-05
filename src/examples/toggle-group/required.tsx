import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group'

export function ToggleGroupRequired() {
  return (
    <ToggleGroup label="Trip pace" required defaultValue="steady">
      <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
      <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
      <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
    </ToggleGroup>
  )
}
