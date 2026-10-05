import { Input, InputType } from '@/registry/ui/input'

export function InputError() {
  return (
    <Input
      className="w-72"
      label="Email"
      type={InputType.Email}
      defaultValue="brian.example.com"
      description="We send the itinerary here"
      error="Enter a valid email address"
    />
  )
}
