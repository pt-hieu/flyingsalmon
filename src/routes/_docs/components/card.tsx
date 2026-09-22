import { createFileRoute } from '@tanstack/react-router'

import { Preview } from '@/components/preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

export const Route = createFileRoute('/_docs/components/card')({
  component: CardPage,
})

function CardPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Card</h1>
        <p className="text-muted-foreground text-lg">
          A flat container that groups related content on one surface. You
          compose what goes inside; the card fixes only the edge, the padding,
          and the interaction feedback.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Slots</h2>
        <p className="text-muted-foreground">
          Seven slots: <code>Card</code>, <code>CardHeader</code>,{' '}
          <code>CardTitle</code>, <code>CardDescription</code>,{' '}
          <code>CardAction</code>, <code>CardContent</code>, and{' '}
          <code>CardFooter</code>. Use the ones you need. There is no variant
          and no size — width comes from your layout, and the one padding step
          is <code>--card-spacing</code>. <code>CardAction</code> is a direct
          child of <code>Card</code>, not of the header: it pins to the bottom
          right so the action never competes with the title for the top edge.
        </p>
        <Preview>
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Weekend in Kyoto</CardTitle>
              <CardDescription>Three days, ten stops</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Temples in the morning, tea in the afternoon, a river walk at
              dusk.
            </CardContent>
            <CardFooter className="text-muted-foreground text-xs">
              Updated today
            </CardFooter>
          </Card>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Flat, never raised</h2>
        <p className="text-muted-foreground">
          The card separates from the page with a solid 1px border and a surface
          step, never a shadow. The system ships no shadow tokens at all.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Interactive</h2>
        <p className="text-muted-foreground">
          Pass <code>interactive</code> and render the link as the direct child
          of <code>CardTitle</code>.{' '}
          <strong className="text-foreground">
            The link stretches its hit area over the whole card
          </strong>{' '}
          through a pseudo-element, so a click anywhere follows it. The card
          itself is not a link, so a nested button stays valid HTML and stays
          independently clickable.
        </p>
        <Preview>
          <Card interactive className="w-72">
            <CardHeader>
              <CardTitle>
                <a href="#kyoto">Weekend in Kyoto</a>
              </CardTitle>
              <CardDescription>Three days, ten stops</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Temples in the morning, tea in the afternoon, a river walk at
              dusk.
            </CardContent>
            <CardAction>
              <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
                Save
              </Button>
            </CardAction>
          </Card>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          A static card has one state. An interactive card has four: rest,
          hover, focus-visible, and pressed. There is no disabled state — a dead
          target must not render as an almost-clickable card. There is no
          loading state either; use skeleton while the content is missing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Hover turns the border orange. Press grows a 2px{' '}
          <code>--primary</code> ring out of nothing while held, matching the
          button. Focus draws a 2px <code>--ring</code> ring around the whole
          card boundary. All three are CSS transitions at{' '}
          <code>--motion-fast</code>. The card owns no other motion — list
          enter, exit, and reorder belong to your app through motion&rsquo;s{' '}
          <code>layout</code> prop.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          An interactive card takes one Tab stop, the title link, and Enter
          activates it. A nested action takes its own Tab stop after it. The
          screen reader hears the title as the link name, not the whole card.
          The focus ring meets 3:1 against both the card and the page; the card
          border is decorative, so the content identifies the card.
        </p>
      </section>
    </article>
  )
}
