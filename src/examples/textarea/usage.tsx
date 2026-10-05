import { useState } from 'react'

import { Textarea } from '@/registry/ui/textarea'

export function TextareaUsage() {
  const [tripNotes, setTripNotes] = useState('')

  return (
    <Textarea
      label="Trip notes"
      value={tripNotes}
      onChange={(event) => setTripNotes(event.target.value)}
    />
  )
}
