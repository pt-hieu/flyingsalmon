import { useState } from 'react'

import { Input } from '@/registry/ui/input'

export function InputUsage() {
  const [tripName, setTripName] = useState('')

  return (
    <Input
      label="Trip name"
      value={tripName}
      onChange={(event) => setTripName(event.target.value)}
    />
  )
}
