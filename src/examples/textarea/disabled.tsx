import { Textarea } from '@/registry/ui/textarea'

export function TextareaDisabled() {
  return (
    <Textarea
      className="w-80"
      label="Trip notes"
      placeholder="Anything the group should know"
      disabled
    />
  )
}
