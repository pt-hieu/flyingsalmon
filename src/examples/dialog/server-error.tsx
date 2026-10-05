import { MapPinPlus } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import { AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import { Input } from '@/registry/ui/input'
import { useNotice } from '@/registry/ui/notice'

export function DialogServerError() {
  const formId = useId()
  const { show } = useNotice()
  const [open, setOpen] = useState(false)
  const [placeName, setPlaceName] = useState('Time Out Market')

  async function addPlace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setOpen(false)

    const saved = await savePlace()

    if (!saved) {
      show({
        variant: AlertVariant.Error,
        title: `${placeName} was not added`,
        description: 'The planner did not answer. What you typed is kept.',
        subject: (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              offsetFocusRingGeometry,
              'ring-ring focus-visible:ring-offset-card rounded-sm',
            )}
          >
            Reopen the form
          </button>
        ),
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button icon={<MapPinPlus />}>Add a place</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a place to Lisbon</DialogTitle>
        <DialogDescription>It goes on the first free day.</DialogDescription>
        <DialogBody>
          <form id={formId} noValidate onSubmit={addPlace}>
            <Input
              label="Place"
              value={placeName}
              onChange={(event) => setPlaceName(event.target.value)}
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            Add place
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function savePlace(): Promise<boolean> {
  return new Promise((resolve) => setTimeout(() => resolve(false), 800))
}
