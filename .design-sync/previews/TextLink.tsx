import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TextLink,
} from 'flyingsalmon'
import { ArrowUpRight } from 'lucide-react'

export function InSentence() {
  return (
    <p className="max-w-sm text-sm">
      Every itinerary starts from a template, and the one we reach for most is
      the{' '}
      <TextLink href="#three-days-in-kyoto">
        three days in Kyoto walking route
      </TextLink>
      , which fits temples, tea, and a river walk into a weekend.
    </p>
  )
}

export function InMutedText() {
  return (
    <div className="w-full max-w-sm">
      <Alert variant={AlertVariant.Warning} animateOpen={false}>
        <AlertTitle>Two travellers have no passport on file</AlertTitle>
        <AlertDescription>
          Add their documents on the{' '}
          <TextLink href="#travellers">travellers page</TextLink> before you
          book.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function ExternalLink() {
  return (
    <p className="max-w-sm text-sm">
      Japan's rail passes are explained on{' '}
      <TextLink
        href="https://www.japan.travel"
        target="_blank"
        rel="noreferrer"
      >
        japan.travel
        <ArrowUpRight aria-hidden="true" />
      </TextLink>
      , which lists every regional option.
    </p>
  )
}

export function OnCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Weekend in Kyoto</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Three days, ten stops, and one very long{' '}
        <TextLink href="#river-walk" className="focus-visible:ring-offset-card">
          river walk at dusk
        </TextLink>
        .
      </CardContent>
    </Card>
  )
}
