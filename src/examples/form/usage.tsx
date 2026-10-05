import { Button } from '@/registry/ui/button'
import { Form, FormActions } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'

export function FormUsage({ onSave }: { onSave: (tripName: string) => void }) {
  function saveTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(String(new FormData(event.currentTarget).get('tripName')))
  }

  return (
    <Form onSubmit={saveTrip}>
      <Input label="Trip name" name="tripName" />
      <FormActions>
        <Button type="submit">Save trip</Button>
      </FormActions>
    </Form>
  )
}
