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

export function DialogUsage() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Plan a trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>
          Pick a destination and your dates.
        </DialogDescription>
        <DialogBody>
          <Input label="Destination" />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button>Plan trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
