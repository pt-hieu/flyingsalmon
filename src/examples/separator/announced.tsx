import { Separator } from '@/registry/ui/separator'

export function SeparatorAnnounced() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <p className="text-sm">Traveller details</p>
      <Separator decorative={false} />
      <p className="text-sm">Passport details</p>
    </div>
  )
}
