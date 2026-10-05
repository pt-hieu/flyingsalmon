import type { AvatarColor } from '@/registry/ui/avatar'
import { Avatar } from '@/registry/ui/avatar'

interface Traveller {
  name: string
  photoUrl?: string
  color: AvatarColor
}

export function TravellerAvatar({ traveller }: { traveller: Traveller }) {
  return (
    <Avatar
      src={traveller.photoUrl}
      name={traveller.name}
      color={traveller.color}
    />
  )
}
