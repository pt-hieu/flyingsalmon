import { useId, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { Input, InputType } from '@/registry/ui/input'

export function AlertInAForm() {
  const formId = useId()
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  async function inviteTraveller(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFailed(false)
    setLoading(true)
    await waitForServer()
    setLoading(false)
    setFailed(true)
  }

  return (
    <form
      id={formId}
      noValidate
      onSubmit={inviteTraveller}
      className="flex w-80 flex-col gap-4"
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
      <Alert variant={AlertVariant.Error} open={failed}>
        <AlertTitle>The invite was not sent</AlertTitle>
        <AlertDescription>
          The server did not answer. Your details are kept; try again.
        </AlertDescription>
      </Alert>
    </form>
  )
}

function waitForServer(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 800))
}
