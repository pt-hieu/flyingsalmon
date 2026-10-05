import { Button, ButtonVariant } from '@/registry/ui/button'
import { Form, FormActions } from '@/registry/ui/form'
import { Input, InputType } from '@/registry/ui/input'
import { Textarea } from '@/registry/ui/textarea'

export function FormFieldErrors() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input
        label="Invite by email"
        name="inviteEmail"
        type={InputType.Email}
        defaultValue="linh.example.com"
        error="Enter a valid email address"
      />
      <Textarea
        label="Message to the group"
        name="message"
        minRows={2}
        defaultValue="Hi"
        error="Say a little more than that"
      />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit">Send invite</Button>
      </FormActions>
    </Form>
  )
}
