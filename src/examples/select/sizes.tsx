import { Select, SelectItem, SelectSize } from '@/registry/ui/select'

export function SelectSizes() {
  return (
    <>
      <Select className="w-64" label="Currency" placeholder="Choose a currency">
        <SelectItem value="usd">US Dollar</SelectItem>
        <SelectItem value="eur">Euro</SelectItem>
        <SelectItem value="vnd">Vietnamese Dong</SelectItem>
      </Select>
      <Select
        className="w-64"
        size={SelectSize.Small}
        label="Currency"
        placeholder="Choose a currency"
      >
        <SelectItem value="usd">US Dollar</SelectItem>
        <SelectItem value="eur">Euro</SelectItem>
        <SelectItem value="vnd">Vietnamese Dong</SelectItem>
      </Select>
    </>
  )
}
