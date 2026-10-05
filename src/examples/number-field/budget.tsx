import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldBudget() {
  return (
    <NumberField
      className="w-64"
      label="Budget per person"
      prefix="$"
      defaultValue={1500}
      min={0}
      step={50}
    />
  )
}
