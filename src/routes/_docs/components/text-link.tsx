import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { ModePreview } from '@/components/mode-preview'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/ui/card'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/text-link')({
  component: TextLinkPage,
})

function TextLinkPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Text Link
        </h1>
        <p className="text-muted-foreground text-lg">
          An anchor for a sentence or a line of UI copy. It takes its size and
          weight from the text around it and carries an underline that never
          leaves; a link navigates and a button acts.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          If it acts, it is a button
        </h2>
        <p className="text-muted-foreground">
          A link navigates: to another page, another site, or a place on the
          same page. A button acts: it sends, saves, opens, or retries.{' '}
          <code>TextLink</code> always renders an anchor with an{' '}
          <code>href</code>, or your router's link through <code>asChild</code>.
          There is no <code>href</code>-less text link: an anchor that navigates
          nowhere is an action, and an action is a button. An action inside a
          sentence — &quot;Didn't get the code? Resend&quot; — is the primary
          button placed inline, and the registry ships no text-looking button
          variant.
        </p>
        <p className="text-muted-foreground">
          Navigation items are not text links either. Breadcrumb's levels,
          sidebar's items, menu items, and pagination's page numbers read as
          links by their position, so they keep their own classes and draw no
          underline. Card and table stretched links stay as they are: the
          surface is the hit target, and an underline inside it would compete
          with the title.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Inside a paragraph</h2>
        <p className="text-muted-foreground">
          The link is <code>display: inline</code>, so it breaks across lines
          with the sentence it sits in and never forces a line of its own. Font
          size, weight, and line height are inherited — there is no{' '}
          <code>size</code> prop and no variant. The text is{' '}
          <code>--foreground</code> in every state; the underline sits at{' '}
          <code>underline-offset-4</code> and is 1px{' '}
          <code>--muted-foreground</code> at rest, 1.5px{' '}
          <code>--foreground</code> on hover and press. It thickens downward
          from the offset, so the line box never moves. Tab to the link below
          and the focus ring closes around each line fragment separately, which
          is what <code>box-decoration-clone</code> is for.
        </p>
        <ModePreview>
          <p className="max-w-sm text-sm">
            Every itinerary starts from a template, and the one we reach for
            most is the{' '}
            <TextLink href="#three-days-in-kyoto">
              three days in Kyoto walking route that begins at Fushimi Inari
            </TextLink>
            , which fits temples, tea, and a river walk into a weekend.
          </p>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Inside muted text</h2>
        <p className="text-muted-foreground">
          In an alert description, a field description, or any muted block, the
          link keeps <code>--foreground</code> while its surroundings stay{' '}
          <code>--muted-foreground</code>, so it reads one step stronger than
          the copy around it. That is why there is no muted variant and no{' '}
          <code>currentColor</code> inheritance: the contrast with the
          surrounding text is the point.
        </p>
        <ModePreview>
          <div className="w-full max-w-sm">
            <Alert variant={AlertVariant.Warning} animateOpen={false}>
              <AlertTitle>Two travellers have no passport on file</AlertTitle>
              <AlertDescription>
                Add their documents on the{' '}
                <TextLink href="#travellers">travellers page</TextLink> before
                you book.
              </AlertDescription>
            </Alert>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">External links</h2>
        <p className="text-muted-foreground">
          There is no <code>external</code> prop. Whether a link opens a new tab
          is your app's policy, so you pass <code>target</code> and{' '}
          <code>rel</code> yourself, and you place the icon as a child. An{' '}
          <code>svg</code> child sits inline at text scale, so it grows and
          shrinks with the sentence instead of holding a fixed pixel size.
        </p>
        <ModePreview>
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
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Router links</h2>
        <p className="text-muted-foreground">
          <code>asChild</code> hands the class names and the props to the
          element you pass, so your router renders the anchor and client-side
          navigation keeps working. This is the same slotting{' '}
          <code>BreadcrumbLink</code> and <code>DropdownMenuItem</code> use. The
          component is named <code>TextLink</code> rather than <code>Link</code>{' '}
          precisely because this case nests the two.
        </p>
        <ModePreview>
          <p className="max-w-sm text-sm">
            Everything on this page is built from the{' '}
            <TextLink asChild>
              <Link to="/">registry components</Link>
            </TextLink>
            .
          </p>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">On another surface</h2>
        <p className="text-muted-foreground">
          The focus ring stands 2px off the text, and that gap paints{' '}
          <code>--background</code>. On a card, or any surface that is not the
          page, pass <code>focus-visible:ring-offset-card</code> through{' '}
          <code>className</code> so the gap matches what the link sits on — the
          same override alert's close button makes.
        </p>
        <ModePreview>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Weekend in Kyoto</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Three days, ten stops, and one very long{' '}
              <TextLink
                href="#river-walk"
                className="focus-visible:ring-offset-card"
              >
                river walk at dusk
              </TextLink>
              .
            </CardContent>
          </Card>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          States, motion, and accessibility
        </h2>
        <p className="text-muted-foreground">
          Rest, hover, press, and focus are the whole set. There is no visited
          state — browsers restrict <code>:visited</code> to colour, and
          &quot;visited&quot; means nothing for a router link — and no disabled
          state, because an anchor that cannot navigate is plain text. The only
          thing that moves is the underline: its colour and its thickness
          together, at <code>--motion-fast</code>. Thickness carries the change
          where colour alone reads faint — a 1px dark stroke on a light ground
          loses to antialiasing in a way a light stroke on a dark ground does
          not. The underline never draws in, because it is never absent.
        </p>
        <p className="text-muted-foreground">
          Tab reaches the link and Enter activates it, the native anchor
          behaviour. Text runs <code>--foreground</code> on{' '}
          <code>--background</code>, the body-text pair; the resting underline
          is <code>--muted-foreground</code> at 4.73:1 light and 7.63:1 dark,
          and the hover underline is <code>--foreground</code> at 1.5px. WCAG
          1.4.1 does not apply here: the underline never leaves, so the link is
          never told apart by colour alone.
        </p>
      </section>
    </article>
  )
}
