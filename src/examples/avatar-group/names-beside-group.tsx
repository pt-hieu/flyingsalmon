import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'

const travellers = [
  { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
  { id: 'minh', name: 'Minh Pham', color: AvatarColor.Fuchsia },
  { id: 'hoa', name: 'Hoa Le', color: AvatarColor.Blue },
  { id: 'anh', name: 'Anh Vo', color: AvatarColor.Pink },
]

export function AvatarGroupNamesBesideGroup() {
  return (
    <div className="flex items-center gap-3">
      <AvatarGroup
        items={travellers}
        max={3}
        aria-label="Hanoi in spring travellers"
      />
      <p className="text-sm">
        <span className="font-medium">Brian, Linh and Minh</span>{' '}
        <span className="text-muted-foreground">and 2 others</span>
      </p>
    </div>
  )
}
