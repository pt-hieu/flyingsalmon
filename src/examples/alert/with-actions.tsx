import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

export function AlertWithActions() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex w-80 flex-col gap-3">
      <Alert
        variant={AlertVariant.Error}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AlertTitle>Day 3 could not be planned</AlertTitle>
        <AlertDescription>
          The planner stopped part-way through.
        </AlertDescription>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
            Try again
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
            Skip the day
          </Button>
        </div>
      </Alert>
    </div>
  )
}
