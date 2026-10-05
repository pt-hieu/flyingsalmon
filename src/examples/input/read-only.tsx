import { Input } from '@/registry/ui/input'

export function InputReadOnly() {
  return (
    <Input
      className="w-72"
      label="Booking reference"
      defaultValue="HT-4F7K2Q"
      readOnly
    />
  )
}
