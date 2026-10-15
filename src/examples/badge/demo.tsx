import { Badge, BadgeVariant } from '@/registry/ui/badge'

export function BadgeDemo() {
  return (
    <>
      <Badge>Underway</Badge>
      <Badge variant={BadgeVariant.Success}>Booked</Badge>
      <Badge variant={BadgeVariant.Warning}>Needs a passport</Badge>
    </>
  )
}
