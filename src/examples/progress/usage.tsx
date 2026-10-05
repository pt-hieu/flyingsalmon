import { Progress } from '@/registry/ui/progress'

export function ProgressUsage({ percent }: { percent: number }) {
  return <Progress value={percent} label="Building your trip" />
}
