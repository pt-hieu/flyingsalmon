import { Textarea } from 'flyingsalmon'

const eightLinesOfNotes = [
  'Day 1 — land at Da Nang, drop bags, walk the beach.',
  'Day 2 — Marble Mountains in the morning, Hoi An after lunch.',
  'Day 3 — lantern market, then the tailor for a fitting.',
  'Day 4 — Ba Na Hills, leave early to beat the queue.',
  'Day 5 — cooking class, then the river boat at dusk.',
  'Day 6 — My Son sanctuary, back for a late lunch.',
  'Day 7 — pick up the tailored jacket, last swim.',
  'Day 8 — fly home.',
].join('\n')

const aLineThatWrapsPastTheSpinner =
  'Saving this draft of the Da Nang itinerary, which runs long enough to wrap onto a second line.'

export function Autosize() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Textarea
        className="w-72"
        label="Notes"
        placeholder="Tell us about the trip"
      />
      <Textarea
        className="w-72"
        label="Notes"
        maxRows={4}
        defaultValue={eightLinesOfNotes}
      />
    </div>
  )
}

export function ErrorState() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Textarea
        className="w-72"
        label="Notes"
        defaultValue="Too short."
        error="Write at least ten characters"
      />
    </div>
  )
}

export function Loading() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Textarea
        className="w-72"
        label="Notes"
        defaultValue={aLineThatWrapsPastTheSpinner}
        loading
      />
      <Textarea
        className="w-72"
        label="Notes"
        defaultValue={aLineThatWrapsPastTheSpinner}
        loading
        error="That draft failed to save"
      />
    </div>
  )
}

export function DisabledAndReadOnly() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Textarea
        className="w-72"
        label="Notes"
        placeholder="Tell us about the trip"
        disabled
      />
      <Textarea
        className="w-72"
        label="Itinerary"
        defaultValue={'Day 1 — arrive.\nDay 2 — depart.'}
        readOnly
      />
    </div>
  )
}
