import { useState } from 'react'

import { Button } from '@/registry/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Form, FormActions } from '@/registry/ui/form'
import { Slider } from '@/registry/ui/slider'

export function SliderInAForm() {
  const [savedBudget, setSavedBudget] = useState(150)
  const [draftBudget, setDraftBudget] = useState(150)
  const [saving, setSaving] = useState(false)

  async function saveBudget(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    await waitForServer()
    setSavedBudget(draftBudget)
    setSaving(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Lisbon long weekend</CardTitle>
        <CardDescription>
          Brian Nguyen&rsquo;s budget: up to ${savedBudget} a night
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={saveBudget}>
          <Slider
            label="Nightly budget"
            name="nightlyBudget"
            min={50}
            max={300}
            step={50}
            value={draftBudget}
            description={`Up to $${draftBudget} a night`}
            onValueChange={setDraftBudget}
          />
          <FormActions>
            <Button type="submit" loading={saving}>
              Save budget
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
