import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Separator, SeparatorOrientation } from '@/registry/ui/separator'

export const Route = createFileRoute('/_docs/components/separator')({
  component: SeparatorPage,
})

function SeparatorPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Separator
        </h1>
        <p className="text-muted-foreground text-lg">
          A one-pixel rule that divides content, horizontal or vertical.
          Decorative by default, announced only when the division carries
          meaning.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A border with no surface
        </h2>
        <p className="text-muted-foreground">
          Put a separator between siblings when neither owns a border of its
          own: rows in a list, groups in a toolbar, a dialog header over its
          body. If the thing on either side already draws a border, the boundary
          is already there and a separator only doubles it. The line paints{' '}
          <code>--border</code>, the same step every other border in the system
          uses. There is no color prop; a consumer that needs another color
          passes one through <code>className</code>.
        </p>
        <ModePreview>
          <div className="flex w-full max-w-xs flex-col gap-3">
            <p className="text-sm">Kyoto</p>
            <Separator />
            <p className="text-sm">Osaka</p>
            <Separator />
            <p className="text-sm">Nara</p>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Orientation</h2>
        <p className="text-muted-foreground">
          <code>orientation</code> is an axis, not a variant, and there is no{' '}
          <code>size</code>: thickness is one pixel in both directions.
          Horizontal is the default and fills the width of its parent. Vertical
          stretches to the height of the flex or grid row it sits in, so a
          toolbar divider needs no explicit height. Radix writes the axis out as{' '}
          <code>data-orientation</code>, which is a public CSS hook.
        </p>
        <ModePreview>
          <div className="flex items-center gap-3">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Day
            </Button>
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Week
            </Button>
            <Separator orientation={SeparatorOrientation.Vertical} />
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Share
            </Button>
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Export
            </Button>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Announced or not</h2>
        <p className="text-muted-foreground">
          A separator is decorative by default and a screen reader hears
          nothing. Pass <code>decorative={'{false}'}</code> when the boundary
          itself carries meaning that no other markup states, such as between
          two form sections that have no headings. The announced separator
          exposes <code>role=&quot;separator&quot;</code>; a vertical one also
          carries <code>aria-orientation=&quot;vertical&quot;</code>, and a
          horizontal one sets nothing because ARIA already defaults to
          horizontal. It looks exactly the same either way: one line, one look.
          The separator is never focusable and never enters the tab order.
        </p>
        <ModePreview>
          <div className="flex w-full max-w-xs flex-col gap-4">
            <p className="text-sm">Traveller details</p>
            <Separator decorative={false} />
            <p className="text-sm">Payment details</p>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Spacing</h2>
        <p className="text-muted-foreground">
          The separator carries no margin of its own. The parent owns the
          spacing through <code>gap</code>, so one number sets the rhythm for
          the rows and the rules between them and nothing has to be undone at
          the ends of a list. One rule to remember: vertical stretches to its
          row, so in a parent that is neither flex nor grid it has no height to
          take and the caller must pass one through <code>className</code>.
        </p>
        <ModePreview>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <p className="text-sm">Tight rhythm</p>
            <Separator />
            <p className="text-sm">gap-2</p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-6">
            <p className="text-sm">Loose rhythm</p>
            <Separator />
            <p className="text-sm">gap-6</p>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Not a labelled separator
        </h2>
        <p className="text-muted-foreground">
          A line with centered text — the &quot;or&quot; between a sign-in form
          and its social buttons — is a different DOM shape, not a variant of
          this component. The props type omits <code>children</code> so that
          shape cannot be faked by passing text into the rule. Build it in the
          app that needs it, or spec it as its own component.
        </p>
      </section>
    </article>
  )
}
