import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldError() {
  return (
    <NumberField
      className="w-64"
      label="Travellers"
      defaultValue={0}
      min={0}
      error="Book for at least one traveller"
    />
  )
}
