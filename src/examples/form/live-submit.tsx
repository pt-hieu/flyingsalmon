import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { Form, FormActions } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'
import { Textarea } from '@/registry/ui/textarea'

export function FormLiveSubmit() {
  const [saving, setSaving] = useState(false)
  const [savedDestination, setSavedDestination] = useState<string | null>(null)

  async function saveTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const destination = String(
      new FormData(event.currentTarget).get('destination'),
    )

    setSavedDestination(null)
    setSaving(true)
    await waitForServer()
    setSavedDestination(destination)
    setSaving(false)
  }

  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={saveTrip}
      result={
        savedDestination ? (
          <Alert variant={AlertVariant.Success}>
            <AlertTitle>Trip saved</AlertTitle>
            <AlertDescription>
              {savedDestination} is ready to share with the group.
            </AlertDescription>
          </Alert>
        ) : null
      }
    >
      <Input label="Destination" name="destination" defaultValue="Lisbon" />
      <Textarea label="Trip notes" name="tripNotes" minRows={2} />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit" loading={saving}>
          Save trip
        </Button>
      </FormActions>
    </Form>
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1600))
}
