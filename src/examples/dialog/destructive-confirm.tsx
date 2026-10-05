import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'

export function DialogDestructiveConfirm() {
  const [tripDeleted, setTripDeleted] = useState(false)

  if (tripDeleted) {
    return (
      <Button
        variant={ButtonVariant.Outline}
        onClick={() => setTripDeleted(false)}
      >
        Restore the demo trip
      </Button>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Hanoi in spring</CardTitle>
        <CardDescription>12 places, 3 travellers</CardDescription>
      </CardHeader>
      <CardAction>
        <Dialog dismissible={false}>
          <DialogTrigger>
            <Button variant={ButtonVariant.Destructive} icon={<Trash2 />}>
              Delete trip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete Hanoi in spring?</DialogTitle>
            <DialogDescription>
              The itinerary and its 12 places go for every traveller on the
              trip.
            </DialogDescription>
            <DialogFooter>
              <DialogClose>
                <Button variant={ButtonVariant.Outline}>Keep trip</Button>
              </DialogClose>
              <DialogClose>
                <Button
                  variant={ButtonVariant.Destructive}
                  onClick={() => setTripDeleted(true)}
                >
                  Delete trip
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardAction>
    </Card>
  )
}
