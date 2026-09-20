import { Plus, Search, Trash2 } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from 'flyingsalmon'

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Save changes</Button>
      <Button variant={ButtonVariant.Outline}>Outline</Button>
      <Button variant={ButtonVariant.Secondary}>Secondary</Button>
      <Button variant={ButtonVariant.Ghost}>Ghost</Button>
      <Button variant={ButtonVariant.Destructive}>Delete trip</Button>
      <Button variant={ButtonVariant.Amber}>Amber</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Save changes</Button>
      <Button size={ButtonSize.Small}>Save changes</Button>
      <Button size={ButtonSize.Icon} aria-label="Add stop" icon={<Plus />} />
      <Button
        size={ButtonSize.IconSmall}
        aria-label="Add stop"
        icon={<Plus />}
      />
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.FieldIcon}
        aria-label="Search"
        icon={<Search />}
      />
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.FieldIconSmall}
        aria-label="Search"
        icon={<Search />}
      />
    </div>
  )
}

export function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={<Plus />}>Add stop</Button>
      <Button variant={ButtonVariant.Outline} icon={<Search />}>
        Find a place
      </Button>
      <Button variant={ButtonVariant.Destructive} icon={<Trash2 />}>
        Delete trip
      </Button>
    </div>
  )
}

export function Loading() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving</Button>
      <Button variant={ButtonVariant.Outline} loading>
        Saving
      </Button>
      <Button size={ButtonSize.Icon} aria-label="Saving" loading />
    </div>
  )
}

export function Disabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Save changes</Button>
      <Button variant={ButtonVariant.Outline} disabled>
        Outline
      </Button>
      <Button variant={ButtonVariant.Ghost} disabled>
        Ghost
      </Button>
    </div>
  )
}
