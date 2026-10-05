import { CircleAlert, CircleCheck, Sparkles, TriangleAlert } from 'lucide-react'

import { Badge, BadgeVariant } from '@/registry/ui/badge'

export function BadgeWithIcon() {
  return (
    <>
      <Badge icon={<Sparkles />}>New</Badge>
      <Badge variant={BadgeVariant.Success} icon={<CircleCheck />}>
        Booked
      </Badge>
      <Badge variant={BadgeVariant.Warning} icon={<TriangleAlert />}>
        Expiring
      </Badge>
      <Badge variant={BadgeVariant.Error} icon={<CircleAlert />}>
        Payment failed
      </Badge>
    </>
  )
}
