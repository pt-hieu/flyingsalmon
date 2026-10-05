import { Progress } from '@/registry/ui/progress'

export function ProgressStates() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <Progress value={0} label="Not started" />
      <Progress value={45} label="Under way" />
      <Progress value={100} label="Complete" />
    </div>
  )
}
