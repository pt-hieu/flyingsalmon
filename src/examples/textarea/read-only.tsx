import { Textarea } from '@/registry/ui/textarea'

export function TextareaReadOnly() {
  return (
    <Textarea
      className="w-80"
      label="Itinerary"
      minRows={2}
      defaultValue={'Day 1: arrive in Lisbon.\nDay 2: Sintra by train.'}
      readOnly
    />
  )
}
