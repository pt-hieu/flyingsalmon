import { Textarea } from '@/registry/ui/textarea'

const itinerary = [
  'Day 1: land at Da Nang, drop bags, walk the beach.',
  'Day 2: Marble Mountains in the morning, Hoi An after lunch.',
  'Day 3: lantern market, then the tailor for a fitting.',
  'Day 4: Ba Na Hills, leave early to beat the queue.',
  'Day 5: cooking class, then the river boat at dusk.',
  'Day 6: My Son sanctuary, back for a late lunch.',
  'Day 7: pick up the tailored jacket, last swim.',
  'Day 8: fly home.',
].join('\n')

export function TextareaAutosize() {
  return (
    <Textarea
      className="w-80"
      label="Da Nang itinerary"
      minRows={2}
      maxRows={4}
      defaultValue={itinerary}
    />
  )
}
