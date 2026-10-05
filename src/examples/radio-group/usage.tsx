import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'

export function RadioGroupUsage() {
  return (
    <RadioGroup label="Room" defaultValue="double">
      <RadioGroupItem value="single" label="Single room" />
      <RadioGroupItem value="double" label="Double room" />
    </RadioGroup>
  )
}
