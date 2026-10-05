import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'

export function RadioGroupDemo() {
  return (
    <RadioGroup label="Pace" defaultValue="two-plans">
      <RadioGroupItem value="slow" label="Slow mornings, one plan a day" />
      <RadioGroupItem value="two-plans" label="Two plans a day, long lunches" />
      <RadioGroupItem value="packed" label="Packed days, early starts" />
    </RadioGroup>
  )
}
