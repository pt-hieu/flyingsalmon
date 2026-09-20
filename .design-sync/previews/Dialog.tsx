import {
  Button,
  ButtonVariant,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogSize,
  DialogTitle,
  DialogTrigger,
  Input,
} from 'flyingsalmon'

export function Open() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Plan a trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>
          Choose a destination and travel dates.
        </DialogDescription>
        <DialogBody>
          <Input label="Destination" name="destination" defaultValue="Kyoto" />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button>Save trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Large() {
  return (
    <Dialog defaultOpen size={DialogSize.Large}>
      <DialogContent>
        <DialogTitle>Trip itinerary</DialogTitle>
        <DialogDescription>
          Ten stops across three days. Drag to reorder.
        </DialogDescription>
        <DialogBody className="text-sm">
          The large size widens the surface for content that needs the room — a
          table, a long form, a side-by-side comparison.
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Close</Button>
          </DialogClose>
          <Button>Save itinerary</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Pending() {
  return (
    <Dialog defaultOpen pending>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>
          Choose a destination and travel dates.
        </DialogDescription>
        <DialogBody>
          <Input label="Destination" name="destination" defaultValue="Kyoto" />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button loading>Saving</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
