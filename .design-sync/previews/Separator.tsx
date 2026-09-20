import {
  Button,
  ButtonSize,
  ButtonVariant,
  Separator,
  SeparatorOrientation,
} from 'flyingsalmon'

export function List() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <p className="text-sm">Kyoto</p>
      <Separator />
      <p className="text-sm">Osaka</p>
      <Separator />
      <p className="text-sm">Nara</p>
    </div>
  )
}

export function Toolbar() {
  return (
    <div className="flex items-center gap-3">
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
        Day
      </Button>
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
        Week
      </Button>
      <Separator orientation={SeparatorOrientation.Vertical} />
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
        Share
      </Button>
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
        Export
      </Button>
    </div>
  )
}

export function Sections() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <p className="text-sm">Traveller details</p>
      <Separator decorative={false} />
      <p className="text-sm">Payment details</p>
    </div>
  )
}
