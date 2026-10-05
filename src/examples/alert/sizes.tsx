import { Alert, AlertSize, AlertVariant } from '@/registry/ui/alert'

export function AlertSizes() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert variant={AlertVariant.Success}>Trip saved</Alert>
      <Alert variant={AlertVariant.Success} size={AlertSize.Small}>
        Trip saved
      </Alert>
    </div>
  )
}
