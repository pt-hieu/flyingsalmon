import { PartyPopper } from 'lucide-react'

import { Alert, AlertVariant } from '@/registry/ui/alert'

export function AlertCustomIcon() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert variant={AlertVariant.Success} icon={<PartyPopper />}>
        Everyone has said yes
      </Alert>
      <Alert variant={AlertVariant.Success} icon={null}>
        Everyone has said yes
      </Alert>
    </div>
  )
}
