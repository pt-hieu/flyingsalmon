import { useState } from 'react'

import { Select, SelectItem } from '@/registry/ui/select'

export function SelectUsage() {
  const [currency, setCurrency] = useState<string>()

  return (
    <Select
      label="Currency"
      placeholder="Choose a currency"
      value={currency}
      onValueChange={setCurrency}
    >
      <SelectItem value="usd">US Dollar</SelectItem>
      <SelectItem value="eur">Euro</SelectItem>
      <SelectItem value="vnd">Vietnamese Dong</SelectItem>
    </Select>
  )
}
