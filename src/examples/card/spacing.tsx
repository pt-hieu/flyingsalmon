import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

export function CardSpacing() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <Card className="w-56">
        <CardHeader>
          <CardTitle>Lisbon</CardTitle>
          <CardDescription>Default spacing</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">Pastel de nata at nine.</CardContent>
      </Card>

      <Card className="w-56 [--card-spacing:--spacing(6)]">
        <CardHeader>
          <CardTitle>Lisbon</CardTitle>
          <CardDescription>Roomier spacing</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">Pastel de nata at nine.</CardContent>
      </Card>
    </div>
  )
}
