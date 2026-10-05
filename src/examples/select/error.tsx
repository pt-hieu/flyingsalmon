import { Select, SelectItem } from '@/registry/ui/select'

export function SelectError() {
  return (
    <Select
      className="w-64"
      label="Currency"
      placeholder="Choose a currency"
      error="Choose a supported currency"
    >
      <SelectItem value="usd">US Dollar</SelectItem>
      <SelectItem value="eur">Euro</SelectItem>
      <SelectItem value="vnd">Vietnamese Dong</SelectItem>
    </Select>
  )
}
