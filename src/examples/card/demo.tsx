import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

export function CardDemo() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Weekend in Kyoto</CardTitle>
        <CardDescription>Three days, ten stops</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Temples in the morning, tea in the afternoon, a river walk at dusk.
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        Updated today
      </CardFooter>
    </Card>
  )
}
