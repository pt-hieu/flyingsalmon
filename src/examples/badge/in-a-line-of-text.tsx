import { Badge, BadgeVariant } from '@/registry/ui/badge'

export function BadgeInALineOfText() {
  return (
    <p className="text-sm">
      Brian Nguyen invited you to{' '}
      <span className="font-medium">Hanoi in spring</span>{' '}
      <Badge variant={BadgeVariant.Outline}>Shared</Badge>
    </p>
  )
}
