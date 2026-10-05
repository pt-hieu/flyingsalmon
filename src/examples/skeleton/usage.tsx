import { Skeleton } from '@/registry/ui/skeleton'

export function SkeletonUsage() {
  return (
    <div aria-busy="true">
      <Skeleton />
      <Skeleton className="w-3/4" />
    </div>
  )
}
