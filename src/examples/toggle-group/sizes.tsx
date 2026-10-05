import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSize,
} from '@/registry/ui/toggle-group'

export function ToggleGroupSizes() {
  return (
    <div className="flex flex-col gap-8">
      <ToggleGroup label="Default" defaultValue="food">
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
        <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        label="Small"
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
