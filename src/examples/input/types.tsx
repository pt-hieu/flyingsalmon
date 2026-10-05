import { Input, InputType } from '@/registry/ui/input'

export function InputTypes() {
  return (
    <div className="flex w-72 flex-col gap-5">
      <Input
        label="Email"
        type={InputType.Email}
        placeholder="brian@example.com"
      />
      <Input
        label="Phone"
        type={InputType.Telephone}
        placeholder="+84 90 123 4567"
      />
      <Input
        label="Booking link"
        type={InputType.Url}
        placeholder="https://example.com/booking"
      />
      <Input label="Password" type={InputType.Password} />
    </div>
  )
}
