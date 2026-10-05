import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/registry/ui/card'
import { Skeleton, SkeletonVariant } from '@/registry/ui/skeleton'

export function SkeletonLoadingRegion() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="w-full max-w-xs space-y-3">
      <Card aria-busy={loading}>
        <CardContent className="flex items-center gap-3">
          {loading ? (
            <>
              <Skeleton variant={SkeletonVariant.Circle} className="size-10" />
              <div className="flex-1 space-y-2">
                <Skeleton />
                <Skeleton className="w-2/3" />
              </div>
            </>
          ) : (
            <div>
              <CardTitle>Brian Nguyen</CardTitle>
              <CardDescription>Organising Lisbon, six days</CardDescription>
            </div>
          )}
        </CardContent>
      </Card>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={() => setLoading(!loading)}
      >
        {loading ? 'Content arrives' : 'Load again'}
      </Button>
    </div>
  )
}
