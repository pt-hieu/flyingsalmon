import { Card, CardContent, Skeleton, SkeletonVariant } from 'flyingsalmon'

export function TripCard() {
  return (
    <Card className="w-72">
      <CardContent className="space-y-3">
        <Skeleton variant={SkeletonVariant.Rectangle} className="h-32 w-full" />
        <div className="flex items-center gap-3">
          <Skeleton variant={SkeletonVariant.Circle} className="size-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4" />
            <Skeleton className="w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ItineraryList() {
  return (
    <div className="w-72 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant={SkeletonVariant.Circle} className="size-8" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-full" />
          <Skeleton className="w-2/3" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton variant={SkeletonVariant.Circle} className="size-8" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-full" />
          <Skeleton className="w-1/2" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton variant={SkeletonVariant.Circle} className="size-8" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-full" />
          <Skeleton className="w-3/4" />
        </div>
      </div>
    </div>
  )
}
