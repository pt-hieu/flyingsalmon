import { Separator } from '@/registry/ui/separator'

export function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <p className="text-sm">Kyoto</p>
      <Separator />
      <p className="text-sm">Osaka</p>
      <Separator />
      <p className="text-sm">Nara</p>
    </div>
  )
}
