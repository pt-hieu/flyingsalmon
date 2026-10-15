import { Checkbox } from '@/registry/ui/checkbox'

export function CheckboxStates() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Share the itinerary" />
      <Checkbox label="Email me before each departure" defaultChecked />
      <Checkbox label="Every traveller" checked="indeterminate" />
      <Checkbox label="Book travel insurance" disabled />
      <Checkbox label="Accept the booking terms" disabled defaultChecked />
    </div>
  )
}
