import { Badge, BadgeVariant } from '@/registry/ui/badge'

export function BadgeVariants() {
  return (
    <>
      <Badge>Planning</Badge>
      <Badge variant={BadgeVariant.Secondary}>Draft</Badge>
      <Badge variant={BadgeVariant.Outline}>Shared</Badge>
      <Badge variant={BadgeVariant.Success}>Booked</Badge>
      <Badge variant={BadgeVariant.Warning}>Expiring</Badge>
      <Badge variant={BadgeVariant.Error}>Payment failed</Badge>
    </>
  )
}
