import { Search } from 'lucide-react'

import { Input, InputType } from '@/registry/ui/input'

export function InputEndAdornment() {
  return (
    <Input
      className="w-72"
      label="Search trips"
      type={InputType.Search}
      placeholder="Lisbon, Hanoi, Da Nang"
      endAdornment={
        <Search className="text-muted-foreground size-4" aria-hidden />
      }
    />
  )
}
