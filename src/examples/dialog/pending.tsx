import { useId, useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
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

export function DialogPending() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [checking, setChecking] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const [codeError, setCodeError] = useState<string>()
  const [joinedTrip, setJoinedTrip] = useState<string | null>(null)

  async function joinTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setChecking(true)

    const tripName = await checkInviteCode(inviteCode)

    setChecking(false)

    if (!tripName) {
      setCodeError('That code has expired. Ask the organiser for a new one.')
      return
    }

    setJoinedTrip(tripName)
    setOpen(false)
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <Dialog open={open} onOpenChange={setOpen} pending={checking}>
        <DialogTrigger>
          <Button variant={ButtonVariant.Outline}>Join with a code</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Join a trip</DialogTitle>
          <DialogDescription>
            Enter the invite code the organiser sent you.
          </DialogDescription>
          <DialogBody>
            <form id={formId} noValidate onSubmit={joinTrip}>
              <Input
                label="Invite code"
                placeholder="KYOTO-2026"
                value={inviteCode}
                error={codeError}
                onChange={(event) => {
                  setInviteCode(event.target.value)
                  setCodeError(undefined)
                }}
              />
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant={ButtonVariant.Outline} disabled={checking}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form={formId} loading={checking}>
              Join trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {joinedTrip ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{joinedTrip}</CardTitle>
            <CardDescription>Organised by Brian Nguyen</CardDescription>
          </CardHeader>
        </Card>
      ) : null}
    </div>
  )
}

function checkInviteCode(inviteCode: string): Promise<string | null> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(inviteCode === 'KYOTO-2026' ? 'Kyoto in autumn' : null),
      1200,
    ),
  )
}
