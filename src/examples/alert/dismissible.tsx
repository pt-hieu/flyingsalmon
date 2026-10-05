import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

export function AlertDismissible() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex w-80 flex-col gap-3">
      <Alert
        variant={AlertVariant.Success}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AlertTitle>Invite sent</AlertTitle>
        <AlertDescription>
          Brian Nguyen invited two travellers to Lisbon.
        </AlertDescription>
      </Alert>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={() => setOpen(true)}
      >
        Send again
      </Button>
    </div>
  )
}
