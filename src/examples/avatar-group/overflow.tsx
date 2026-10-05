import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'

const travellers = [
  { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
  { id: 'minh', name: 'Minh Pham', color: AvatarColor.Fuchsia },
  { id: 'hoa', name: 'Hoa Le', color: AvatarColor.Blue },
  { id: 'anh', name: 'Anh Vo', color: AvatarColor.Pink },
]

export function AvatarGroupOverflow() {
  return (
    <>
      <AvatarGroup
        items={travellers}
        max={2}
        aria-label="Travellers, two shown"
      />
      <AvatarGroup
        items={travellers}
        max={4}
        aria-label="Travellers, four shown"
      />
      <AvatarGroup
        items={travellers}
        max={5}
        aria-label="Travellers, all shown"
      />
    </>
  )
}
