import { Spinner } from '@/registry/ui/spinner'

export function SpinnerDemo() {
  return (
    <p className="text-muted-foreground flex items-center gap-2 text-sm">
      <Spinner label="Checking availability" />
      Checking availability for 12 October
    </p>
  )
}
