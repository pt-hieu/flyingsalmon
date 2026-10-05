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

export function FormServerError() {
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)

  async function saveTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFailed(false)
    setSaving(true)

    try {
      await saveToServer()
    } catch {
      setFailed(true)
    }

    setSaving(false)
  }

  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={saveTrip}
      result={
        failed ? (
          <Alert variant={AlertVariant.Error}>
            <AlertTitle>The trip was not saved</AlertTitle>
            <AlertDescription>
              Your changes are still here. Check your connection and try again.
            </AlertDescription>
          </Alert>
        ) : null
      }
    >
      <Input label="Trip name" name="tripName" defaultValue="Da Nang in May" />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit" loading={saving}>
          Save trip
        </Button>
      </FormActions>
    </Form>
  )
}

async function saveToServer() {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  throw new Error('Offline')
}
