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

export function DrawerUsage() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Trip details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Kyoto in autumn</DrawerTitle>
        <DrawerDescription>12 to 19 October, 3 travellers.</DrawerDescription>
        <DrawerBody>
          Three nights at Ryokan Aoi, then on to Kanazawa.
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
