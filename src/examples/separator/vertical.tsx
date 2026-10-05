import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Separator, SeparatorOrientation } from '@/registry/ui/separator'

export function SeparatorVertical() {
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
