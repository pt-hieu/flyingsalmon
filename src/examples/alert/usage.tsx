import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'

export function AlertUsage() {
  return (
    <Alert variant={AlertVariant.Success}>
      <AlertTitle>Trip saved</AlertTitle>
      <AlertDescription>Six days in Lisbon, ready to share.</AlertDescription>
    </Alert>
  )
}
