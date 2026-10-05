import { NumberField, NumberFieldSize } from '@/registry/ui/number-field'
import { Switch, SwitchSize } from '@/registry/ui/switch'

export function SwitchInARowOfFields() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-end gap-4">
        <NumberField
          label="Budget"
          prefix="$"
          defaultValue={1200}
          className="w-48"
        />
        <Switch label="For the whole group" />
      </div>
      <div className="flex items-end gap-4">
        <NumberField
          label="Travellers"
          size={NumberFieldSize.Small}
          defaultValue={2}
          min={1}
          className="w-40"
        />
        <Switch label="Children" size={SwitchSize.Small} />
      </div>
    </div>
  )
}
