import { useId, useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTitleElement,
} from '@/registry/ui/card'
import { DatePicker } from '@/registry/ui/date-picker'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogSize,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import { Form } from '@/registry/ui/form'
import { Input, InputType } from '@/registry/ui/input'

interface Traveller {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string | null
}

export function DialogLarge() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [traveller, setTraveller] = useState<Traveller>({
    firstName: 'Brian',
    lastName: 'Nguyen',
    email: 'brian@example.com',
    phone: '',
    dateOfBirth: null,
  })
  const [draft, setDraft] = useState(traveller)

  function saveTraveller(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTraveller(draft)
    setOpen(false)
  }

  function updateDraft<Field extends keyof Traveller>(
    field: Field,
    value: Traveller[Field],
  ) {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }))
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle as={CardTitleElement.H4}>
          {`${traveller.firstName} ${traveller.lastName}`}
        </CardTitle>
        <CardDescription>{traveller.email}</CardDescription>
      </CardHeader>
      <CardAction>
        <Dialog
          size={DialogSize.Large}
          open={open}
          onOpenChange={(nextOpen) => {
            setDraft(traveller)
            setOpen(nextOpen)
          }}
        >
          <DialogTrigger>
            <Button variant={ButtonVariant.Outline}>Edit traveller</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Traveller details</DialogTitle>
            <DialogDescription>
              Airlines need these exactly as they appear on the passport.
            </DialogDescription>
            <DialogBody>
              <Form
                id={formId}
                onSubmit={saveTraveller}
                className="grid gap-4 sm:grid-cols-2"
              >
                <Input
                  label="First name"
                  value={draft.firstName}
                  onChange={(event) =>
                    updateDraft('firstName', event.target.value)
                  }
                />
                <Input
                  label="Last name"
                  value={draft.lastName}
                  onChange={(event) =>
                    updateDraft('lastName', event.target.value)
                  }
                />
                <Input
                  label="Email"
                  type={InputType.Email}
                  value={draft.email}
                  onChange={(event) => updateDraft('email', event.target.value)}
                />
                <Input
                  label="Phone"
                  type={InputType.Telephone}
                  value={draft.phone}
                  onChange={(event) => updateDraft('phone', event.target.value)}
                />
                <DatePicker
                  label="Date of birth"
                  value={draft.dateOfBirth}
                  onChange={(dateOfBirth) =>
                    updateDraft('dateOfBirth', dateOfBirth)
                  }
                />
              </Form>
            </DialogBody>
            <DialogFooter>
              <DialogClose>
                <Button variant={ButtonVariant.Outline}>Cancel</Button>
              </DialogClose>
              <Button type="submit" form={formId}>
                Save traveller
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardAction>
    </Card>
  )
}
