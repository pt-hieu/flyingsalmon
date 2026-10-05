import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'

const travellers = [
  { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
]

export function TripTravellers() {
  return <AvatarGroup items={travellers} aria-label="Trip travellers" />
}
