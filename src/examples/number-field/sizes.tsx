import { NumberField, NumberFieldSize } from '@/registry/ui/number-field'

export function NumberFieldSizes() {
  return (
    <>
      <NumberField
        className="w-64"
        label="Travellers"
        defaultValue={2}
        min={1}
      />
      <NumberField
        className="w-64"
        size={NumberFieldSize.Small}
        label="Travellers"
        defaultValue={2}
        min={1}
      />
    </>
  )
}
