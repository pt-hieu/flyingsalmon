import { useState } from 'react'

import { Button } from '@/registry/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTitleElement,
} from '@/registry/ui/card'
import { Form, FormActions } from '@/registry/ui/form'
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupMode,
} from '@/registry/ui/toggle-group'

export function ToggleGroupInAForm() {
  const [savedInterests, setSavedInterests] = useState<string[]>(['food'])
  const [draftInterests, setDraftInterests] = useState<string[]>(['food'])
  const [saving, setSaving] = useState(false)

  async function saveInterests(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)

    try {
      await waitForServer()
      setSavedInterests(draftInterests)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Form className="w-full max-w-md" onSubmit={saveInterests}>
      <Card>
        <CardHeader>
          <CardTitle as={CardTitleElement.H4}>
            Brian Nguyen&rsquo;s interests
          </CardTitle>
          <CardDescription>
            {savedInterests.length > 0
              ? `Saved: ${savedInterests.join(', ')}`
              : 'Nothing saved yet'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup
            label="Interests"
            name="interests"
            mode={ToggleGroupMode.Multiple}
            value={draftInterests}
            onValueChange={setDraftInterests}
          >
            <ToggleGroupItem value="food">Food</ToggleGroupItem>
            <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
            <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>
      <FormActions>
        <Button type="submit" loading={saving}>
          Save interests
        </Button>
      </FormActions>
    </Form>
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1200))
}
