import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

const travellers = [
  { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
  { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
  { id: 'minh', name: 'Minh Pham', color: AvatarColor.Fuchsia },
]

export function AvatarGroupOnACard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Hanoi in spring</CardTitle>
        <CardDescription>12 places</CardDescription>
      </CardHeader>
      <CardContent>
        <AvatarGroup
          items={travellers}
          className="[&>*]:ring-card"
          aria-label="Hanoi in spring travellers"
        />
      </CardContent>
    </Card>
  )
}
