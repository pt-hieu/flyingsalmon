import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Select, SelectItem } from '@/registry/ui/select'

const visibilityLabels: Record<string, string> = {
  private: 'Only you',
  friends: 'Friends you invite',
}

export function SelectLoading() {
  const [visibility, setVisibility] = useState('private')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()

  async function changeVisibility(nextVisibility: string) {
    setSaving(true)
    setError(undefined)

    try {
      await saveVisibility(nextVisibility)
      setVisibility(nextVisibility)
    } catch {
      setError('Public trips need a verified email')
    }

    setSaving(false)
  }

  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Lisbon long weekend</CardTitle>
        <CardDescription>
          Visible to: {visibilityLabels[visibility]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          label="Who can see this trip"
          value={visibility}
          onValueChange={changeVisibility}
          loading={saving}
          error={error}
        >
          <SelectItem value="private">Only you</SelectItem>
          <SelectItem value="friends">Friends you invite</SelectItem>
          <SelectItem value="public">Anyone with the link</SelectItem>
        </Select>
      </CardContent>
    </Card>
  )
}

async function saveVisibility(nextVisibility: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  if (nextVisibility === 'public') {
    throw new Error('Not verified')
  }
}
