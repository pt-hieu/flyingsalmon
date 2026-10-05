import { Select, SelectItem } from '@/registry/ui/select'

export function SelectDescription() {
  return (
    <Select
      className="w-64"
      label="Currency"
      placeholder="Choose a currency"
      description="Prices show in this currency"
    >
      <SelectItem value="usd">US Dollar</SelectItem>
      <SelectItem value="eur">Euro</SelectItem>
      <SelectItem value="vnd">Vietnamese Dong</SelectItem>
    </Select>
  )
}
