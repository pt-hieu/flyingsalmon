import { NumberField, NumberFieldSize } from 'flyingsalmon'

export function Variants() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <NumberField
        className="w-56"
        label="Group size"
        defaultValue={2}
        min={1}
        max={12}
      />
      <NumberField
        className="w-56"
        label="Budget per person"
        prefix="$"
        defaultValue={1500}
        min={0}
        step={50}
      />
      <NumberField
        className="w-56"
        label="Duration"
        unit="days"
        defaultValue={7}
        min={1}
        max={30}
      />
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <NumberField
        className="w-56"
        label="Group size"
        defaultValue={2}
        min={1}
      />
      <NumberField
        className="w-56"
        size={NumberFieldSize.Small}
        label="Group size"
        defaultValue={2}
        min={1}
      />
    </div>
  )
}

export function Error() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <NumberField
        className="w-56"
        label="Group size"
        defaultValue={0}
        min={0}
        error="Book for at least one guest"
      />
      <NumberField
        className="w-56"
        size={NumberFieldSize.Small}
        label="Budget per person"
        prefix="$"
        defaultValue={0}
        min={0}
        step={50}
        error="Enter a budget above zero"
      />
    </div>
  )
}

export function Loading() {
  return (
    <NumberField
      className="w-56"
      label="Budget per person"
      prefix="$"
      defaultValue={1500}
      min={0}
      step={50}
      loading
    />
  )
}

export function DisabledAndReadOnly() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <NumberField
        className="w-56"
        label="Group size"
        defaultValue={2}
        min={1}
        disabled
      />
      <NumberField
        className="w-56"
        label="Duration"
        unit="days"
        defaultValue={7}
        min={1}
        max={30}
        readOnly
      />
    </div>
  )
}
