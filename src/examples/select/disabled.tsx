import { Select, SelectItem } from '@/registry/ui/select'

export function SelectDisabled() {
  return (
    <Select
      className="w-64"
      label="Currency"
      defaultValue="usd"
      description="Fixed once the first payment is made"
      disabled
    >
      <SelectItem value="usd">US Dollar</SelectItem>
      <SelectItem value="eur">Euro</SelectItem>
    </Select>
  )
}
