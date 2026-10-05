import { Input, InputType } from '@/registry/ui/input'

export function InputDescription() {
  return (
    <Input
      className="w-72"
      label="Email"
      type={InputType.Email}
      placeholder="brian@example.com"
      description="We send the itinerary here"
    />
  )
}
