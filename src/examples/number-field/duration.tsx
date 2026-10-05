import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldDuration() {
  return (
    <NumberField
      className="w-64"
      label="Trip length"
      unit="days"
      defaultValue={7}
      min={1}
      max={30}
    />
  )
}
