import { Progress } from '@/registry/ui/progress'

export function ProgressCustomMax() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Progress value={5} max={7} label="Planning days" />
      <p className="text-muted-foreground text-xs">Day 5 of 7 planned</p>
    </div>
  )
}
