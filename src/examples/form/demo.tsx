import { Button, ButtonVariant } from '@/registry/ui/button'
import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'
import { Form, FormActions } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'

export function FormDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input label="Destination" name="destination" placeholder="Lisbon" />
      <DatePicker
        mode={DatePickerMode.Range}
        label="Dates"
        startName="start"
        endName="end"
      />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit">Save trip</Button>
      </FormActions>
    </Form>
  )
}
