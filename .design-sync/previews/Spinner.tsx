import { Spinner, SpinnerSize } from 'flyingsalmon'

export function Sizes() {
  return (
    <div className="border-border bg-card flex w-72 flex-col gap-3 rounded-lg border p-4 text-sm">
      <div className="text-foreground flex items-center gap-2">
        <Spinner />
        <span>Generating your Kyoto itinerary</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-2">
        <Spinner size={SpinnerSize.Small} />
        <span>Saving trip</span>
      </div>
    </div>
  )
}

export function Colors() {
  return (
    <div className="border-border bg-card flex w-72 flex-col gap-3 rounded-lg border p-4 text-sm">
      <div className="text-primary-text flex items-center gap-2">
        <Spinner size={SpinnerSize.Small} />
        <span>Publishing trip</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-2">
        <Spinner size={SpinnerSize.Small} />
        <span>Syncing route</span>
      </div>
      <div className="text-destructive flex items-center gap-2">
        <Spinner size={SpinnerSize.Small} />
        <span>Payment failed, retrying</span>
      </div>
    </div>
  )
}
