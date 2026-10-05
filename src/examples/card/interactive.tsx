import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

export function CardInteractive() {
  return (
    <Card interactive className="w-72">
      <CardHeader>
        <CardTitle>
          <a href="#kyoto">Weekend in Kyoto</a>
        </CardTitle>
        <CardDescription>Three days, ten stops</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Temples in the morning, tea in the afternoon, a river walk at dusk.
      </CardContent>
      <CardAction>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
          Save
        </Button>
      </CardAction>
    </Card>
  )
}
