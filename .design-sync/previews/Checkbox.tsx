import { Checkbox } from 'flyingsalmon'

export function States() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" disabled defaultChecked />
    </div>
  )
}

export function SelectAllGroup() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="All fruit" checked="indeterminate" />
      <div className="flex flex-col gap-3 pl-7">
        <Checkbox label="Apples" checked={false} />
        <Checkbox label="Oranges" checked />
        <Checkbox label="Pears" checked={false} />
      </div>
    </div>
  )
}

export function Error() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Accept the terms"
        error="You must accept the terms to continue"
      />
      <Checkbox
        label="Accept the terms"
        defaultChecked
        error="Accept the updated terms, revised today"
      />
    </div>
  )
}
