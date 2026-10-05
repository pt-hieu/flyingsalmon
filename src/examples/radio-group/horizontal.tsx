import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupOrientation,
} from '@/registry/ui/radio-group'

export function RadioGroupHorizontal() {
  return (
    <RadioGroup
      label="Seat"
      defaultValue="window"
      orientation={RadioGroupOrientation.Horizontal}
    >
      <RadioGroupItem value="window" label="Window" />
      <RadioGroupItem value="aisle" label="Aisle" />
      <RadioGroupItem value="either" label="Either" />
    </RadioGroup>
  )
}
