import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'
import type { AvatarGroupItem } from '@/registry/ui/avatar-group'

const travellers: AvatarGroupItem[] = [
  {
    id: 'brian',
    name: 'Brian Nguyen',
    src: '/avatar-sample-sky-300.svg',
    color: AvatarColor.Sky,
  },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
  { id: 'minh', name: 'Minh Pham', color: AvatarColor.Fuchsia },
  { id: 'hoa', name: 'Hoa Le', color: AvatarColor.Blue },
  { id: 'anh', name: 'Anh Vo', color: AvatarColor.Pink },
]

export function AvatarGroupDemo() {
  return (
    <AvatarGroup items={travellers} aria-label="Hanoi in spring travellers" />
  )
}
