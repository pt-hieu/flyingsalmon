import { Copy, Ellipsis, Plus, Share2 } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/registry/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'
import { Input } from '@/registry/ui/input'

export function DialogManyTriggers() {
  const [planOpen, setPlanOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Button icon={<Plus />} onClick={() => setPlanOpen(true)}>
        Plan a trip
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Icon}
            aria-label="More trip actions"
            icon={<Ellipsis />}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={<Copy />} onSelect={() => setPlanOpen(true)}>
            Plan a similar trip
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Share2 />}>Share</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PlanTripDialog open={planOpen} onOpenChange={setPlanOpen} />
    </div>
  )
}

interface PlanTripDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function PlanTripDialog({ open, onOpenChange }: PlanTripDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>Where to next?</DialogDescription>
        <DialogBody>
          <Input label="Destination" placeholder="Da Nang" />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button>Plan trip</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
