import { Checkbox } from '@/registry/ui/checkbox'

export function CheckboxError() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="I have read the cancellation policy"
        error="Read the policy to continue"
      />
      <Checkbox
        label="I have read the cancellation policy"
        defaultChecked
        error="The policy changed today. Read it again."
      />
    </div>
  )
}
