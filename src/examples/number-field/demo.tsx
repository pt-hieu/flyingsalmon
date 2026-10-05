import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldDemo() {
  return (
    <NumberField
      className="w-64"
      label="Travellers"
      defaultValue={2}
      min={1}
      max={12}
    />
  )
}
