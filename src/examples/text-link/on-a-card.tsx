import { Card, CardContent, CardHeader, CardTitle } from '@/registry/ui/card'
import { TextLink } from '@/registry/ui/text-link'

export function TextLinkOnACard() {
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
