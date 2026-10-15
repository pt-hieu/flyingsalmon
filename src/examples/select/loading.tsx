import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTitleElement,
} from '@/registry/ui/card'
import { Select, SelectItem } from '@/registry/ui/select'

const visibilityOptions = [
  { value: 'private', label: 'Only you' },
  { value: 'friends', label: 'Friends you invite' },
  { value: 'public', label: 'Anyone with the link' },
]

export function SelectLoading() {
  const [visibility, setVisibility] = useState('private')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>()
  const visibilityLabel = visibilityOptions.find(
    (option) => option.value === visibility,
  )?.label

  async function changeVisibility(nextVisibility: string) {
    setSaving(true)
    setError(undefined)

    try {
      await saveVisibility(nextVisibility)
      setVisibility(nextVisibility)
    } catch {
      setError('Public trips need a verified email')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle as={CardTitleElement.H4}>Lisbon long weekend</CardTitle>
        <CardDescription>Visible to: {visibilityLabel}</CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          label="Who can see this trip"
          value={visibility}
          onValueChange={changeVisibility}
          loading={saving}
          error={error}
        >
          {visibilityOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
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
