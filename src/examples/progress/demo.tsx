import { Progress } from '@/registry/ui/progress'

export function ProgressDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <p className="text-sm font-medium">Building your trip</p>
      <Progress value={62} label="Building your trip" />
      <p className="text-muted-foreground text-xs">Choosing places in Lisbon</p>
    </div>
  )
}
