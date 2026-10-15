import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { Form } from '@/registry/ui/form'
import { Input, InputType } from '@/registry/ui/input'

export function AlertInAForm() {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  async function inviteTraveller(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFailed(false)
    setLoading(true)

    try {
      await waitForServer()
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      onSubmit={inviteTraveller}
      onReset={() => setFailed(false)}
      className="w-80 gap-4"
      result={
        <Alert variant={AlertVariant.Error} open={failed}>
          <AlertTitle>The invite was not sent</AlertTitle>
          <AlertDescription>
            The server did not answer. Your details are kept; try again.
          </AlertDescription>
        </Alert>
      }
    >
      <Input
        label="Email"
        type={InputType.Email}
        defaultValue="mai@example.com"
      />
      <div className="flex justify-end gap-2">
        <Button type="reset" variant={ButtonVariant.Outline}>
          Reset
        </Button>
        <Button type="submit" loading={loading}>
          Invite traveller
        </Button>
      </div>
    </Form>
  )
}

function waitForServer(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 800))
}
