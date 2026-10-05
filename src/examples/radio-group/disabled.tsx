import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'

export function RadioGroupDisabled() {
  return (
    <div className="flex flex-col gap-8">
      <RadioGroup label="Boat tour" defaultValue="sunset">
        <RadioGroupItem value="sunset" label="Sunset cruise" />
        <RadioGroupItem value="morning" label="Morning cruise" />
        <RadioGroupItem value="night" label="Night cruise, sold out" disabled />
      </RadioGroup>
      <RadioGroup
        label="Room, locked after booking"
        defaultValue="double"
        disabled
      >
        <RadioGroupItem value="single" label="Single room" />
        <RadioGroupItem value="double" label="Double room" />
      </RadioGroup>
    </div>
  )
}
