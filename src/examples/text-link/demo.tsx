import { TextLink } from '@/registry/ui/text-link'

export function TextLinkDemo() {
  return (
    <p className="max-w-sm text-sm">
      Every itinerary starts from a template, and the one Brian Nguyen reaches
      for most is the{' '}
      <TextLink href="#three-days-in-kyoto">
        three days in Kyoto walking route that begins at Fushimi Inari
      </TextLink>
      , which fits temples, tea, and a river walk into a weekend.
    </p>
  )
}
