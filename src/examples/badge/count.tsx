import { Badge, BadgeVariant } from '@/registry/ui/badge'

export function BadgeCount() {
  return (
    <p className="flex items-center gap-2 text-sm font-medium">
      Places to visit
      <Badge variant={BadgeVariant.Secondary}>12</Badge>
    </p>
  )
}
