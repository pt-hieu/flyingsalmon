import { Spinner } from '@/registry/ui/spinner'

export function SpinnerColour() {
  return (
    <>
      <span className="text-foreground">
        <Spinner />
      </span>
      <span className="text-indicator">
        <Spinner />
      </span>
      <span className="text-muted-foreground">
        <Spinner />
      </span>
      <span className="text-destructive">
        <Spinner />
      </span>
    </>
  )
}
