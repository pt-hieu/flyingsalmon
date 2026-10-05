import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'

export function AlertTitleAndDescription() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <Alert variant={AlertVariant.Warning}>
        <AlertTitle>Flight prices changed</AlertTitle>
        <AlertDescription>
          Lisbon to Porto is now 20 euros more for Brian Nguyen and two
          travellers.
        </AlertDescription>
      </Alert>
      <Alert variant={AlertVariant.Error}>
        <AlertTitle>The trip could not be saved</AlertTitle>
        <AlertDescription>The planner did not answer.</AlertDescription>
      </Alert>
    </div>
  )
}
