import { createFileRoute } from '@tanstack/react-router'
import { Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

export const Route = createFileRoute('/components/button')({
  component: ButtonPage,
})

function ButtonPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Button
        </h1>
        <p className="text-muted-foreground text-lg">
          The action component. It triggers one action and shows that action's
          busyness itself. Its loading morph is the motion template every other
          component copies.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Loading is the only result it owns
        </h2>
        <p className="text-muted-foreground">
          A button shows that its action is running. It never shows that the
          action succeeded or failed —{' '}
          <strong className="text-foreground">
            that result belongs to the app, shown inline by the alert component.
          </strong>{' '}
          There is no success tick, no error shake, and no toast anywhere in
          this system.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Variants</h2>
        <p className="text-muted-foreground">
          Five variants cover every action shape. <code>default</code> is the
          one primary action on a view. <code>outline</code> and{' '}
          <code>secondary</code> carry the actions beside it, <code>ghost</code>{' '}
          the ones inside a dense row. <code>destructive</code> stays soft — a
          red tint with red text, never a solid red fill, because a delete
          button should read as serious, not as an alarm. There is no{' '}
          <code>link</code> variant: a link is an <code>&lt;a&gt;</code>.
        </p>
        <p className="text-muted-foreground">
          Hover moves the surface one step and keeps the label above AA. The
          three neutral variants wash to the same indigo tint, so a surface
          without a color of its own borrows the accent.{' '}
          <strong className="text-foreground">
            Two hovers step the label with the surface, because the surface step
            alone would drop it under AA:
          </strong>{' '}
          <code>destructive</code> in both modes, and <code>default</code> in
          dark, where the fill deepens instead of paling out.
        </p>
        <ModePreview>
          <Button>Default</Button>
          <Button variant={ButtonVariant.Outline}>Outline</Button>
          <Button variant={ButtonVariant.Secondary}>Secondary</Button>
          <Button variant={ButtonVariant.Ghost}>Ghost</Button>
          <Button variant={ButtonVariant.Destructive}>Destructive</Button>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Four sizes. <code>default</code> at 36px and <code>sm</code> at 32px
          match the two input heights, so a field and its submit button line up
          in a row. <code>icon</code> and <code>icon-sm</code> are the square
          ones:{' '}
          <strong className="text-foreground">
            they render no label, so give them an <code>aria-label</code>.
          </strong>{' '}
          There is no <code>xs</code> and no <code>lg</code>.
        </p>
        <ModePreview>
          <Button>Save changes</Button>
          <Button size={ButtonSize.Small}>Save changes</Button>
          <Button
            size={ButtonSize.Icon}
            aria-label="Add item"
            icon={<Plus />}
          />
          <Button
            size={ButtonSize.IconSmall}
            aria-label="Add item"
            icon={<Plus />}
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Leading icon</h2>
        <p className="text-muted-foreground">
          The <code>icon</code> prop fills the leading slot. There is no
          trailing slot — a trailing icon reads as a menu or a link, and this
          component is neither. An icon-size button takes the same prop, or its
          child if you prefer that spelling. There is no <code>asChild</code>: a
          button is a <code>&lt;button&gt;</code>.
        </p>
        <ModePreview>
          <Button icon={<Search />}>Search</Button>
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Small}
            icon={<Plus />}
          >
            Add item
          </Button>
          <Button variant={ButtonVariant.Destructive} icon={<Trash2 />}>
            Delete project
          </Button>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Loading</h2>
        <p className="text-muted-foreground">
          <code>loading</code> puts the spinner in the leading slot. With an
          icon there, the spinner replaces it instantly — no cross-fade, because
          two icons dissolving into each other reads as a glitch. With no icon,
          the slot appears and the button widens around it on a spring. The
          label stays at full opacity the whole time, so the button never hides
          what it does. Icon sizes show the spinner alone.
        </p>
        <ModePreview>
          <Button loading>Save changes</Button>
          <Button variant={ButtonVariant.Outline} loading icon={<Search />}>
            Search
          </Button>
          <Button variant={ButtonVariant.Destructive} loading icon={<Trash2 />}>
            Delete project
          </Button>
          <Button
            size={ButtonSize.Icon}
            aria-label="Add item"
            loading
            icon={<Plus />}
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The width morph</h2>
        <p className="text-muted-foreground">
          Press the button to watch the slot open and close. The width animates
          through motion's <code>layout</code> prop with{' '}
          <code>spring-bounce</code> going in and the same spring coming back at{' '}
          <code>--motion-base</code>. Nothing around the button jumps, because
          the morph runs on transforms.
        </p>
        <ModePreview>
          <LoadingMorphDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Disabled</h2>
        <p className="text-muted-foreground">
          Disabled dims the button to 50% and takes no pointer events.{' '}
          <strong className="text-foreground">Loading is not disabled.</strong>{' '}
          A disabled button leaves the tab order; a loading one must not, or a
          keyboard user loses their place mid-action.
        </p>
        <ModePreview>
          <Button disabled>Save changes</Button>
          <Button variant={ButtonVariant.Outline} disabled>
            Save changes
          </Button>
          <Button variant={ButtonVariant.Secondary} disabled>
            Save changes
          </Button>
          <Button variant={ButtonVariant.Ghost} disabled>
            Save changes
          </Button>
          <Button variant={ButtonVariant.Destructive} disabled>
            Delete project
          </Button>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Inside a form</h2>
        <p className="text-muted-foreground">
          A button defaults to <code>type="button"</code>, so a Cancel beside
          the submit does not post the form.{' '}
          <strong className="text-foreground">
            The submit button says <code>type="submit"</code> explicitly.
          </strong>{' '}
          HTML's own default is the other way round and turns every button in an
          action row into a submit, silently. The same default protects a dialog
          footer or card footer rendered inside a form.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Focus and press</h2>
        <p className="text-muted-foreground">
          Tab to a button for the focus ring: 3px held off the button by a 2px
          gap in the page color, so it stays visible on the filled variants too.{' '}
          <strong className="text-foreground">
            The ring takes the color of the button under it.
          </strong>{' '}
          <code>default</code> rings in its own indigo, <code>destructive</code>{' '}
          in red, and the three neutral variants in <code>--ring</code>, which
          is the same focus color the input uses. The ring appears on{' '}
          <code>:focus-visible</code> only, so a mouse click never leaves one
          behind. Hold the button for the press ring: the same color, a tighter
          2px, gone the moment you let go. A loading button shows no press ring
          — there is nothing to press.
        </p>
        <ModePreview>
          <Button>Default</Button>
          <Button variant={ButtonVariant.Outline}>Outline</Button>
          <Button variant={ButtonVariant.Destructive}>Destructive</Button>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Hover color, the press ring, and the focus ring are CSS transitions at{' '}
          <code>--motion-fast</code>. The loading slot and the width are the one
          morph: motion's <code>layout</code> prop with{' '}
          <code>spring-bounce</code> at <code>--motion-base</code>. The spinner
          runs its own 800ms turn on CSS keyframes. That is all three engines in
          one component, which is why the rest of the system copies this file.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          A loading button sets <code>aria-busy</code> and{' '}
          <strong className="text-foreground">
            never the <code>disabled</code> attribute.
          </strong>{' '}
          It keeps its focus, stays in the tab order, and ignores clicks, Enter,
          and Space — including form submission. Its spinner is{' '}
          <code>aria-hidden</code>, so the wait is announced once through{' '}
          <code>aria-busy</code> and the label stays the accessible name. Every
          variant meets WCAG AA for text in both modes, hover states included.
        </p>
      </section>
    </article>
  )
}

function LoadingMorphDemo() {
  const [loading, setLoading] = useState(false)
  const settleTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (settleTimeout.current) clearTimeout(settleTimeout.current)
    }
  }, [])

  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true)
        settleTimeout.current = setTimeout(() => setLoading(false), 1600)
      }}
    >
      Save changes
    </Button>
  )
}
