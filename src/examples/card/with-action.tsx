import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

export function CardWithAction() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Invite Mai Tran</CardTitle>
        <CardDescription>She can view and edit the trip.</CardDescription>
      </CardHeader>
      <CardAction>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
          Not now
        </Button>
        <Button size={ButtonSize.Small}>Send invite</Button>
      </CardAction>
    </Card>
  )
}
