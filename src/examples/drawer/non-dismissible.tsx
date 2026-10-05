import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/ui/drawer'
import { Input } from '@/registry/ui/input'

export function DrawerNonDismissible() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Add a stop</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Add a stop</DrawerTitle>
        <DrawerDescription>
          A click on the page beside the panel leaves it open.
        </DrawerDescription>
        <DrawerBody>
          <div className="flex flex-col gap-4">
            <Input label="City" placeholder="Porto" />
            <Input label="Nights" placeholder="3" />
            <Input label="Lodging" placeholder="Casa do Conto" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DrawerClose>
          <DrawerClose>
            <Button>Add stop</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
