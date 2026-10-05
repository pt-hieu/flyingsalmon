import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'

export function ComboboxDisabled() {
  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      disabled
      label="Return city"
      placeholder="Same as departure"
      value={null}
      onValueChange={() => {}}
    >
      <ComboboxItem value="city-london">London</ComboboxItem>
    </Combobox>
  )
}
