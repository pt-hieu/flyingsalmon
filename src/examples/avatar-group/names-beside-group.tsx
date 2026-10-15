import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'

const travellers = [
  { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
  { id: 'minh', name: 'Minh Pham', color: AvatarColor.Fuchsia },
  { id: 'hoa', name: 'Hoa Le', color: AvatarColor.Blue },
  { id: 'anh', name: 'Anh Vo', color: AvatarColor.Pink },
]

const visibleCount = 3

export function AvatarGroupNamesBesideGroup() {
  const firstNames = travellers
    .slice(0, visibleCount)
    .map((traveller) => traveller.name.split(' ')[0])
  const otherCount = travellers.length - visibleCount

  return (
    <div className="flex items-center gap-3">
      <AvatarGroup
        items={travellers}
        max={visibleCount}
        aria-label="Hanoi in spring travellers"
      />
      <p className="text-sm">
        <span className="font-medium">{listNames(firstNames)}</span>{' '}
        <span className="text-muted-foreground">and {otherCount} others</span>
      </p>
    </div>
  )
}

function listNames(names: string[]) {
  return `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
}
