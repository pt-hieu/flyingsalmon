import { useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import { Checkbox } from '@/registry/ui/checkbox'
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

const packingItems = [
  'Passport',
  'Travel insurance',
  'Phone charger',
  'Plug adapter',
  'Rain jacket',
  'Walking shoes',
  'Sunglasses',
  'Sun cream',
  'Reusable water bottle',
  'Day bag',
  'Headphones',
  'Paperback for the flight',
  'Swimsuit',
  'First aid kit',
  'Spare cash',
]

export function DialogScrollingBody() {
  const [packed, setPacked] = useState<string[]>([])

  function togglePacked(item: string, checked: boolean) {
    setPacked(
      checked
        ? [...packed, item]
        : packed.filter((packedItem) => packedItem !== item),
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={ButtonVariant.Outline}>
          Packing list ({packed.length} of {packingItems.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Packing list</DialogTitle>
        <DialogDescription>Lisbon, five days in October.</DialogDescription>
        <DialogBody>
          <div className="flex flex-col gap-3">
            {packingItems.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={packed.includes(item)}
                onCheckedChange={(checked) =>
                  togglePacked(item, checked === true)
                }
              />
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
