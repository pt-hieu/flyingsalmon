import { useId, useState } from 'react'

import { AvatarGroup } from '@/registry/ui/avatar-group'
import type { AvatarGroupItem } from '@/registry/ui/avatar-group'
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
import { Form } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'

export function DrawerPending() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [checking, setChecking] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string>()
  const [travellers, setTravellers] = useState<AvatarGroupItem[]>([
    { id: 'brian@example.com', name: 'Brian Nguyen' },
  ])

  async function inviteTraveller(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const invitedTraveller = travellers.find(
      (traveller) => traveller.id === email,
    )

    if (invitedTraveller) {
      setEmailError(`${invitedTraveller.name} is already on this trip.`)
      return
    }

    setChecking(true)

    try {
      const travellerName = await findTraveller(email)

      if (!travellerName) {
        setEmailError('No traveller uses that email. Check the spelling.')
        return
      }

      setTravellers((currentTravellers) => [
        ...currentTravellers,
        { id: email, name: travellerName },
      ])
      setEmail('')
      setOpen(false)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Drawer open={open} onOpenChange={setOpen} pending={checking}>
        <DrawerTrigger>
          <Button variant={ButtonVariant.Outline}>Invite a traveller</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Invite a traveller</DrawerTitle>
          <DrawerDescription>
            The address is looked up before they are added. Try mai@example.com.
          </DrawerDescription>
          <DrawerBody>
            <Form id={formId} onSubmit={inviteTraveller}>
              <Input
                label="Email"
                value={email}
                error={emailError}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setEmailError(undefined)
                }}
              />
            </Form>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose>
              <Button variant={ButtonVariant.Outline} disabled={checking}>
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" form={formId} loading={checking}>
              Invite
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AvatarGroup items={travellers} aria-label="Travellers on this trip" />
    </div>
  )
}

function findTraveller(email: string): Promise<string | null> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(email === 'mai@example.com' ? 'Mai Tran' : null),
      1200,
    ),
  )
}
