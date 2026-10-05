import { houseStickerArt } from '@/components/house-sticker-art'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { Sticker } from '@/registry/ui/sticker'

export function TripHomeSticker() {
  return (
    <Sticker
      art={houseStickerArt}
      label={houseStickerLabel}
      roleClassNames={houseStickerRoleClassNames}
    />
  )
}
