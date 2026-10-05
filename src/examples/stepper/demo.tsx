import { Stepper } from '@/registry/ui/stepper'

export function StepperDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Planning your trip</span>
        <span className="text-muted-foreground tabular-nums">
          Question 2 of 4
        </span>
      </div>
      <Stepper count={4} current={2} label="Trip questions" />
      <p className="text-muted-foreground text-xs">
        Next: who is travelling with you
      </p>
    </div>
  )
}
