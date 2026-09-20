import {
  Button,
  ButtonSize,
  ButtonVariant,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'flyingsalmon'
import { ArrowRight } from 'lucide-react'

export function Slots() {
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

export function WithAction() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Lisbon in spring</CardTitle>
        <CardDescription>Five days, twelve stops</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        Tram 28 at sunrise, pastéis in Belém, fado after dark.
      </CardContent>
      <CardAction>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Small}
          icon={<ArrowRight />}
          aria-label="Open trip"
        />
      </CardAction>
    </Card>
  )
}

export function Interactive() {
  return (
    <Card interactive className="w-72">
      <CardHeader>
        <CardTitle>
          <a href="#kyoto">Weekend in Kyoto</a>
        </CardTitle>
        <CardDescription>Three days, ten stops</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        The whole card follows the title's link, so a click anywhere opens the
        trip.
      </CardContent>
    </Card>
  )
}

export function ContentOnly() {
  return (
    <Card className="w-72">
      <CardContent className="text-sm">
        A card needs no header. Width comes from your layout; the card fixes
        only the edge, the padding, and the interaction feedback.
      </CardContent>
    </Card>
  )
}
