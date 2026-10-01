import { NumberField, NumberFieldSize, Switch, SwitchSize } from 'flyingsalmon'

export function OnAndOff() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Wi-Fi" />
      <Switch label="Wi-Fi" defaultChecked />
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Default" defaultChecked />
      <Switch label="Small" size={SwitchSize.Small} defaultChecked />
    </div>
  )
}

export function InARowOfFields() {
  return (
    <div className="flex flex-col gap-8">
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

export function Loading() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Wi-Fi" loading />
      <Switch label="Wi-Fi" loading checked />
    </div>
  )
}

export function Disabled() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Wi-Fi" disabled />
      <Switch label="Wi-Fi" disabled checked />
    </div>
  )
}

export function WithoutLabel() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch aria-label="Airplane mode" />
      <Switch aria-label="Airplane mode" defaultChecked />
    </div>
  )
}
