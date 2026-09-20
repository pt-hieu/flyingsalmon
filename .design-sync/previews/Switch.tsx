import { Switch } from 'flyingsalmon'

export function OnAndOff() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch label="Wi-Fi" />
      <Switch label="Wi-Fi" defaultChecked />
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
