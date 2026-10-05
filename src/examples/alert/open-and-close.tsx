import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

export function AlertOpenAndClose() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-80 flex-col gap-3">
      <Alert variant={AlertVariant.Warning} open={open}>
        <AlertTitle>Two seats left at this price</AlertTitle>
        <AlertDescription>Lisbon to Porto, Friday 12 October.</AlertDescription>
      </Alert>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close the alert' : 'Open the alert'}
      </Button>
    </div>
  )
}
