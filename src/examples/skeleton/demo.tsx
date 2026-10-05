import { Card, CardContent } from '@/registry/ui/card'
import { Skeleton, SkeletonVariant } from '@/registry/ui/skeleton'

export function SkeletonDemo() {
  return (
    <Card className="w-full max-w-xs">
      <CardContent className="space-y-3">
        <Skeleton variant={SkeletonVariant.Rectangle} className="h-24 w-full" />
        <Skeleton />
        <Skeleton className="w-3/4" />
      </CardContent>
    </Card>
  )
}
