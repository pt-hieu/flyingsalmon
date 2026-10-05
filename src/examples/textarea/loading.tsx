import { useState } from 'react'

import { Textarea } from '@/registry/ui/textarea'

export function TextareaLoading() {
  const [tripNotes, setTripNotes] = useState(
    'Saving this draft of the Da Nang notes, which runs long enough to wrap onto a second line.',
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()

  async function saveDraft() {
    setSaving(true)
    setError(undefined)

    try {
      await saveTripNotes(tripNotes)
    } catch {
      setError('That draft failed to save')
    }

    setSaving(false)
  }

  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      description="Saves when you tab out. Add the word fail to see an error."
      value={tripNotes}
      onChange={(event) => setTripNotes(event.target.value)}
      onBlur={saveDraft}
      loading={saving}
      error={error}
    />
  )
}

async function saveTripNotes(tripNotes: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  if (tripNotes.includes('fail')) {
    throw new Error('Could not save')
  }
}
