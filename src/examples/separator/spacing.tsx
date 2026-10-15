import { Separator } from '@/registry/ui/separator'

export function SeparatorSpacing() {
  return (
    <>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <p className="text-sm">Day 1 · Lisbon</p>
        <Separator />
        <p className="text-sm">Day 2 · Sintra</p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-6">
        <p className="text-sm">Day 3 · Cascais</p>
        <Separator />
        <p className="text-sm">Day 4 · Porto</p>
      </div>
    </>
  )
}
