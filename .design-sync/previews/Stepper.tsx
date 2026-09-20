import { Stepper } from 'flyingsalmon'

export function Labelled() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Planning your trip</span>
        <span className="text-muted-foreground tabular-nums">Turn 2 of 4</span>
      </div>
      <Stepper count={4} current={2} label="Intake turn" />
      <p className="text-muted-foreground text-xs">
        Next: who is coming with you
      </p>
    </div>
  )
}

export function Positions() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="space-y-1">
        <Stepper count={4} current={1} label="Just started" />
        <p className="text-muted-foreground text-xs">Turn 1 of 4</p>
      </div>
      <div className="space-y-1">
        <Stepper count={4} current={3} label="Underway" />
        <p className="text-muted-foreground text-xs">Turn 3 of 4</p>
      </div>
      <div className="space-y-1">
        <Stepper count={4} current={4} label="Finished" />
        <p className="text-muted-foreground text-xs">Turn 4 of 4</p>
      </div>
    </div>
  )
}
