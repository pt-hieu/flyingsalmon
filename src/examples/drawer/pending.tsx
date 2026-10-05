import { useId, useState } from 'react'

import { Avatar } from '@/registry/ui/avatar'
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

export function DrawerPending() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [checking, setChecking] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string>()
  const [travellers, setTravellers] = useState(['Brian Nguyen'])

  async function inviteTraveller(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setChecking(true)

    const travellerName = await findTraveller(email)

    setChecking(false)

    if (!travellerName) {
      setEmailError('No traveller uses that email. Check the spelling.')
      return
    }

    setTravellers([...travellers, travellerName])
    setEmail('')
    setOpen(false)
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
            <form id={formId} noValidate onSubmit={inviteTraveller}>
              <Input
                label="Email"
                value={email}
                error={emailError}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setEmailError(undefined)
                }}
              />
            </form>
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

      <div className="flex items-center gap-2">
        {travellers.map((travellerName) => (
          <Avatar key={travellerName} name={travellerName} />
        ))}
      </div>
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
