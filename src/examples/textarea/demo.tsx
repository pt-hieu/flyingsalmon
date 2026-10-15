import { Textarea } from '@/registry/ui/textarea'

export function TextareaDemo() {
  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      placeholder="We land late, so keep the first evening free."
    />
  )
}
