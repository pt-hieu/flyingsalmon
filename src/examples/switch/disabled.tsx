import { Switch } from '@/registry/ui/switch'

export function SwitchDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Offline maps" disabled />
      <Switch label="Offline maps" disabled checked />
    </div>
  )
}
