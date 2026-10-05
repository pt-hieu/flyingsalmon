import { AvatarColor, AvatarSize } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'

const travellers = [
  { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
  { id: 'minh', name: 'Minh Pham', color: AvatarColor.Fuchsia },
  { id: 'hoa', name: 'Hoa Le', color: AvatarColor.Blue },
]

export function AvatarGroupSizes() {
  return (
    <>
      <AvatarGroup items={travellers} aria-label="Hanoi in spring travellers" />
      <AvatarGroup
        items={travellers}
        size={AvatarSize.Small}
        aria-label="Hanoi in spring travellers"
      />
    </>
  )
}
