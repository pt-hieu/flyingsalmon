import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'

export function RadioGroupError() {
  return (
    <RadioGroup label="Room" required error="Pick a room to continue">
      <RadioGroupItem value="single" label="Single room" />
      <RadioGroupItem value="double" label="Double room" />
      <RadioGroupItem value="family" label="Family room" />
    </RadioGroup>
  )
}
