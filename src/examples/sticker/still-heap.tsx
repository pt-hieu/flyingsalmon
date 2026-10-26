import { houseStickerArt } from '@/components/house-sticker-art'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { routeStickerArt } from '@/components/route-sticker-art'
import {
  routeStickerLabel,
  routeStickerRoleClassNames,
} from '@/components/route-sticker'
import { snappedPencilStickerArt } from '@/components/snapped-pencil-sticker-art'
import {
  snappedPencilStickerLabel,
  snappedPencilStickerRoleClassNames,
} from '@/components/snapped-pencil-sticker'
import { Sticker } from '@/registry/ui/sticker'

export function StickerStillHeap() {
  return (
    <div className="flex w-full max-w-lg items-center">
      <Sticker
        art={routeStickerArt}
        label={routeStickerLabel}
        roleClassNames={routeStickerRoleClassNames}
        popIn={false}
        boil={false}
        className="max-w-48 -rotate-6"
      />
      <Sticker
        art={houseStickerArt}
        label={houseStickerLabel}
        roleClassNames={houseStickerRoleClassNames}
        popIn={false}
        boil={false}
        className="-mr-28 -ml-16 mt-16 max-w-56 rotate-2"
      />
      <Sticker
        art={snappedPencilStickerArt}
        label={snappedPencilStickerLabel}
        roleClassNames={snappedPencilStickerRoleClassNames}
        popIn={false}
        boil={false}
        className="max-w-48 rotate-6"
      />
    </div>
  )
}
