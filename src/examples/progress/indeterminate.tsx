import { Progress } from '@/registry/ui/progress'

export function ProgressIndeterminate() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Progress label="Contacting the planner" />
      <p className="text-muted-foreground text-xs">Contacting the planner</p>
    </div>
  )
}
