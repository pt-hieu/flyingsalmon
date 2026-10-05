import { Switch } from '@/registry/ui/switch'

export function SwitchLoading() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Saving, off" loading />
      <Switch label="Saving, on" loading checked />
    </div>
  )
}
