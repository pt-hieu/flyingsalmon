import { Progress } from '@/registry/ui/progress'

export function ProgressDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Building your trip</span>
        <span className="text-muted-foreground tabular-nums">62%</span>
      </div>
      <Progress value={62} label="Building your trip" />
      <p className="text-muted-foreground text-xs">Choosing places in Lisbon</p>
    </div>
  )
}
