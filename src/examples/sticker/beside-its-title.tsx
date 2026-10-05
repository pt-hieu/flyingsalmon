import { houseStickerArt } from '@/components/house-sticker-art'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { Button } from '@/registry/ui/button'
import { Sticker } from '@/registry/ui/sticker'

export function StickerBesideItsTitle() {
  return (
    <div className="flex w-full max-w-lg items-center gap-6">
      <Sticker
        art={houseStickerArt}
        label={houseStickerLabel}
        roleClassNames={houseStickerRoleClassNames}
        popIn={false}
        className="max-w-40 shrink-0 -rotate-2"
      />
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-heading text-xl font-bold">Welcome home, Brian</h3>
        <p className="text-muted-foreground text-sm">
          Your Hanoi in spring trip is over. Share the photos with the people
          who came along.
        </p>
        <Button>Share the photos</Button>
      </div>
    </div>
  )
}
