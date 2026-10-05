import { Textarea } from '@/registry/ui/textarea'

export function TextareaDescription() {
  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      placeholder="Anything the group should know"
      description="Everyone on the trip can read these"
    />
  )
}
