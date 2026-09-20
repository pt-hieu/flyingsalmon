import { Progress } from 'flyingsalmon'

export function Determinate() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Building your trip</span>
        <span className="text-muted-foreground tabular-nums">62%</span>
      </div>
      <Progress value={62} label="Building your trip" />
      <p className="text-muted-foreground text-xs">Picking anchors in Kyoto</p>
    </div>
  )
}

export function Indeterminate() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Searching flights</span>
        <span className="text-muted-foreground text-xs">Working&hellip;</span>
      </div>
      <Progress label="Searching flights" />
    </div>
  )
}

export function States() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="space-y-1">
        <p className="text-muted-foreground text-xs">Not started</p>
        <Progress value={0} label="Not started" />
      </div>
      <div className="space-y-1">
        <p className="text-muted-foreground text-xs">Underway</p>
        <Progress value={45} label="Underway" />
      </div>
      <div className="space-y-1">
        <p className="text-muted-foreground text-xs">Complete</p>
        <Progress value={100} label="Complete" />
      </div>
    </div>
  )
}

export function CustomMax() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Progress value={5} max={7} label="Writing days" />
      <p className="text-muted-foreground text-xs">Day 5 of 7</p>
    </div>
  )
}
