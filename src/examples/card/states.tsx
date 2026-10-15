import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Skeleton } from '@/registry/ui/skeleton'

export function CardStates() {
  return (
    <div className="flex flex-wrap gap-4">
      <Card className="w-56">
        <CardHeader>
          <CardTitle>Weekend in Kyoto</CardTitle>
          <CardDescription>Three days, ten stops</CardDescription>
        </CardHeader>
      </Card>

      <Card interactive className="w-56">
        <CardHeader>
          <CardTitle>
            <a href="#lisbon">Lisbon long weekend</a>
          </CardTitle>
          <CardDescription>Four days, six stops</CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-56" aria-busy="true">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-32" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-24" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
