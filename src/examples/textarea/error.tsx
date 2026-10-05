import { Textarea } from '@/registry/ui/textarea'

export function TextareaError() {
  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      defaultValue="Too short."
      description="Everyone on the trip can read these"
      error="Write at least ten characters"
    />
  )
}
