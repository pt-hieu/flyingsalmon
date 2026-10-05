import { Skeleton } from '@/registry/ui/skeleton'

export function SkeletonTextFollowsFont() {
  return (
    <>
      <div className="w-full max-w-xs space-y-3 text-xs">
        <Skeleton />
        <p className="text-muted-foreground">Small text line</p>
      </div>
      <div className="w-full max-w-xs space-y-3 text-2xl">
        <Skeleton />
        <p className="text-muted-foreground text-xs">Heading line</p>
      </div>
    </>
  )
}
