import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group'

export function ToggleGroupDisabled() {
  return (
    <div className="flex flex-col gap-8">
      <ToggleGroup label="One chip disabled" defaultValue="food">
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums" disabled>
          Museums, closed today
        </ToggleGroupItem>
        <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup label="Whole group disabled" defaultValue="food" disabled>
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
        <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
