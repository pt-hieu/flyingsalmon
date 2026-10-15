import { Textarea } from '@/registry/ui/textarea'

export function TextareaDescription() {
  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      placeholder="We land late, so keep the first evening free."
      description="Everyone on the trip can read these"
    />
  )
}
