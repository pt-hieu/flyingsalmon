import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
  Button,
  ButtonVariant,
  Form,
  FormActions,
  Input,
  InputType,
  Textarea,
} from 'flyingsalmon'

export function Basic() {
  return (
    <Form className="w-full max-w-sm">
      <Input label="Destination" name="destination" placeholder="Lisbon" />
      <Input label="Dates" name="dates" placeholder="12–19 Oct" />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit">Save trip</Button>
      </FormActions>
    </Form>
  )
}

export function FieldErrors() {
  return (
    <Form className="w-full max-w-sm">
      <Input
        label="Email"
        name="email"
        type={InputType.Email}
        defaultValue="not-an-address"
        error="Enter a valid email address"
      />
      <Textarea
        label="Notes"
        name="notes"
        minRows={2}
        defaultValue="…"
        error="Say a little more than that"
      />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit">Save trip</Button>
      </FormActions>
    </Form>
  )
}

export function Submitting() {
  return (
    <Form className="w-full max-w-sm">
      <Input label="Destination" name="destination" defaultValue="Lisbon" />
      <Textarea label="Notes" name="notes" minRows={2} />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit" loading>
          Save trip
        </Button>
      </FormActions>
    </Form>
  )
}

export function ResultSlot() {
  return (
    <Form
      className="w-full max-w-sm"
      result={
        <Alert variant={AlertVariant.Error} animateOpen={false}>
          <AlertTitle>That card was declined</AlertTitle>
          <AlertDescription>
            Try another card, or pay by bank transfer.
          </AlertDescription>
        </Alert>
      }
    >
      <Input
        label="Card number"
        name="card"
        defaultValue="4242 4242 4242 4242"
      />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit">Pay</Button>
      </FormActions>
    </Form>
  )
}
