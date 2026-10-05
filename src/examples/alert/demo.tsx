import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'

export function AlertDemo() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <Alert variant={AlertVariant.Success}>
        <AlertTitle>Trip saved</AlertTitle>
        <AlertDescription>Six days in Lisbon, ready to share.</AlertDescription>
      </Alert>
    </div>
  )
}
