import { Alert, AlertVariant } from '@/registry/ui/alert'

export function AlertVariants() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert>Saved as a draft</Alert>
      <Alert variant={AlertVariant.Success}>Trip saved</Alert>
      <Alert variant={AlertVariant.Warning}>Two seats left at this price</Alert>
      <Alert variant={AlertVariant.Error}>The trip could not be saved</Alert>
    </div>
  )
}
