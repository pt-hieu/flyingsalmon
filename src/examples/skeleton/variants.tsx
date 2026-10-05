import { Skeleton, SkeletonVariant } from '@/registry/ui/skeleton'

export function SkeletonVariants() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <Skeleton />
      <div className="flex items-center gap-3">
        <Skeleton variant={SkeletonVariant.Circle} className="size-10" />
        <Skeleton className="w-32" />
      </div>
      <Skeleton variant={SkeletonVariant.Rectangle} className="h-24 w-full" />
    </div>
  )
}
