import { useState } from 'react'

import { Button } from '@/registry/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTitleElement,
} from '@/registry/ui/card'
import { Checkbox } from '@/registry/ui/checkbox'
import { Form, FormActions } from '@/registry/ui/form'

export function CheckboxInAForm() {
  const [policyRead, setPolicyRead] = useState(false)
  const [policyError, setPolicyError] = useState<string>()
  const [booked, setBooked] = useState(false)
  const [booking, setBooking] = useState(false)

  async function bookTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!policyRead) {
      setPolicyError('Read the cancellation policy to book')
      return
    }

    setBooking(true)

    try {
      await waitForServer()
      setBooked(true)
    } finally {
      setBooking(false)
    }
  }

  return (
    <Form className="w-full max-w-sm" onSubmit={bookTrip}>
      <Card>
        <CardHeader>
          <CardTitle as={CardTitleElement.H4}>Lisbon long weekend</CardTitle>
          <CardDescription>
            {booked
              ? 'Booked for Brian Nguyen'
              : 'Not booked yet. Brian Nguyen is the only traveller.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Checkbox
            label="I have read the cancellation policy"
            required
            checked={policyRead}
            error={policyError}
            onCheckedChange={(isChecked) => {
              setPolicyRead(isChecked === true)
              setPolicyError(undefined)
            }}
          />
        </CardContent>
      </Card>
      <FormActions>
        <Button type="submit" loading={booking} disabled={booked}>
          Book trip
        </Button>
      </FormActions>
    </Form>
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1200))
}
