import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

export function CardUsage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekend in Kyoto</CardTitle>
        <CardDescription>Three days, ten stops</CardDescription>
      </CardHeader>
      <CardContent>Temples in the morning, tea in the afternoon.</CardContent>
    </Card>
  )
}
