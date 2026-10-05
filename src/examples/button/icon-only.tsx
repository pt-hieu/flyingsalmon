import { Heart, Pencil, Plus } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

export function ButtonIconOnly() {
  return (
    <>
      <Button size={ButtonSize.Icon} aria-label="Add a place" icon={<Plus />} />
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Icon}
        aria-label="Save to favourites"
        icon={<Heart />}
      />
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.IconSmall}
        aria-label="Rename trip"
        icon={<Pencil />}
      />
    </>
  )
}
