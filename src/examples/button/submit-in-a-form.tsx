import { useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Form, FormActions } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'

const savedTripName = 'Lisbon long weekend'

export function ButtonSubmitInAForm() {
  const [tripName, setTripName] = useState(savedTripName)
  const [draftName, setDraftName] = useState(savedTripName)
  const [saving, setSaving] = useState(false)

  async function renameTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    await waitForServer()
    setTripName(draftName)
    setSaving(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{tripName}</CardTitle>
        <CardDescription>Brian Nguyen and two travellers</CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={renameTrip}>
          <Input
            label="Trip name"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
          />
          <FormActions>
            <Button
              variant={ButtonVariant.Outline}
              onClick={() => setDraftName(tripName)}
            >
              Reset
            </Button>
            <Button type="submit" loading={saving}>
              Rename
            </Button>
          </FormActions>
        </Form>
      </CardContent>
    </Card>
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1200))
}
