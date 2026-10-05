import { Input } from '@/registry/ui/input'

export function InputDisabled() {
  return (
    <Input
      className="w-72"
      label="Departure city"
      placeholder="Ho Chi Minh City"
      disabled
    />
  )
}
