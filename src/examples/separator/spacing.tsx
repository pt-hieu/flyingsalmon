import { Separator } from '@/registry/ui/separator'

export function SeparatorSpacing() {
  return (
    <>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <p className="text-sm">Tight rhythm</p>
        <Separator />
        <p className="text-sm">gap-2</p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-6">
        <p className="text-sm">Loose rhythm</p>
        <Separator />
        <p className="text-sm">gap-6</p>
      </div>
    </>
  )
}
