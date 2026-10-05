import { Switch, SwitchSize } from '@/registry/ui/switch'

export function SwitchSizes() {
  return (
    <div className="flex flex-col gap-4">
      {[SwitchSize.Default, SwitchSize.Small].map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-6">
          <Switch label="Off" size={size} />
          <Switch label="On" size={size} defaultChecked />
        </div>
      ))}
    </div>
  )
}
