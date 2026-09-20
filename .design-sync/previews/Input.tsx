import { Search } from 'lucide-react'

import { Input, InputSize, InputType } from 'flyingsalmon'

export function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <Input
        className="w-64"
        label="Email"
        type={InputType.Email}
        placeholder="you@example.com"
      />
      <Input
        className="w-64"
        size={InputSize.Small}
        label="Email"
        type={InputType.Email}
        placeholder="you@example.com"
      />
    </div>
  )
}

export function EndAdornment() {
  return (
    <div className="flex flex-col gap-3">
      <Input
        className="w-64"
        label="Search"
        type={InputType.Search}
        placeholder="Find a component"
        endAdornment={
          <Search className="text-muted-foreground size-4" aria-hidden />
        }
      />
    </div>
  )
}

export function Error() {
  return (
    <div className="flex flex-col gap-3">
      <Input
        className="w-64"
        label="Email"
        type={InputType.Email}
        defaultValue="not-an-address"
        error="Enter a valid email address"
      />
    </div>
  )
}

export function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <Input className="w-64" label="Username" defaultValue="brian" loading />
    </div>
  )
}

export function DisabledAndReadOnly() {
  return (
    <div className="flex flex-col gap-3">
      <Input
        className="w-64"
        label="Email"
        placeholder="you@example.com"
        disabled
      />
      <Input
        className="w-64"
        label="Account id"
        defaultValue="fs_8f252f6"
        readOnly
      />
    </div>
  )
}
