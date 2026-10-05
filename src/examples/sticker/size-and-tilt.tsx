import { houseStickerArt } from '@/components/house-sticker-art'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { Sticker } from '@/registry/ui/sticker'

export function StickerSizeAndTilt() {
  return (
    <>
      <Sticker
        art={houseStickerArt}
        label={houseStickerLabel}
        roleClassNames={houseStickerRoleClassNames}
        popIn={false}
        className="max-w-52 -rotate-2"
      />
      <Sticker
        art={houseStickerArt}
        label={houseStickerLabel}
        roleClassNames={houseStickerRoleClassNames}
        popIn={false}
        className="max-w-60 rotate-3"
      />
    </>
  )
}
