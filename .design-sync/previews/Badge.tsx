import { Badge, BadgeVariant } from 'flyingsalmon'
import { CircleAlert, CircleCheck, Sparkles, TriangleAlert } from 'lucide-react'

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant={BadgeVariant.Secondary}>Secondary</Badge>
      <Badge variant={BadgeVariant.Outline}>Outline</Badge>
      <Badge variant={BadgeVariant.Success}>Success</Badge>
      <Badge variant={BadgeVariant.Warning}>Warning</Badge>
      <Badge variant={BadgeVariant.Error}>Error</Badge>
    </div>
  )
}

export function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge icon={<Sparkles />}>New</Badge>
      <Badge variant={BadgeVariant.Success} icon={<CircleCheck />}>
        Paid
      </Badge>
      <Badge variant={BadgeVariant.Warning} icon={<TriangleAlert />}>
        Expiring
      </Badge>
      <Badge variant={BadgeVariant.Error} icon={<CircleAlert />}>
        Failed
      </Badge>
    </div>
  )
}

export function TripStatusList() {
  return (
    <div className="flex w-64 flex-col gap-2 text-sm">
      <div className="flex items-center justify-between">
        <span>Kyoto, three days</span>
        <Badge variant={BadgeVariant.Success}>Booked</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span>Lisbon, five days</span>
        <Badge variant={BadgeVariant.Warning}>Pending</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span>Da Nang, four days</span>
        <Badge variant={BadgeVariant.Secondary}>Draft</Badge>
      </div>
    </div>
  )
}
