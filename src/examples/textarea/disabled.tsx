import { Textarea } from '@/registry/ui/textarea'

export function TextareaDisabled() {
  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      placeholder="We land late, so keep the first evening free."
      disabled
    />
  )
}
