import { createFileRoute } from '@tanstack/react-router'
import { CircleAlert, CircleCheck, Sparkles, TriangleAlert } from 'lucide-react'

import { ModePreview } from '@/components/mode-preview'
import { Badge } from '@/registry/ui/badge'

export const Route = createFileRoute('/components/badge')({
  component: BadgePage,
})

function BadgePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Badge
        </h1>
        <p className="text-muted-foreground text-lg">
          A static marker for a status, a category, or a small count. It is not
          a link and not a button. Nothing inside it is interactive.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Variants</h2>
        <p className="text-muted-foreground">
          Six variants. <code>default</code> and <code>secondary</code> fill;{' '}
          <code>outline</code> draws a border only. The status trio{' '}
          <code>success</code>, <code>warning</code>, and <code>error</code>{' '}
          shares one shape: a soft tint behind colored text.
        </p>
        <ModePreview>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error is a status</h2>
        <p className="text-muted-foreground">
          The <code>error</code> variant paints from the <code>--error</code>{' '}
          tint pair, never from <code>--destructive</code>. Destructive red
          names an action a person can take, such as delete. Error red reports a
          state that already exists.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Size</h2>
        <p className="text-muted-foreground">
          One size: 20px tall at <code>text-xs</code>, in a full pill. A badge
          sits inside a line of text or a table cell, so a second size would
          break the line rhythm it lives in.
        </p>
        <ModePreview>
          <Badge variant="secondary">42</Badge>
          <Badge variant="secondary">New</Badge>
          <Badge variant="secondary">In review</Badge>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Icon</h2>
        <p className="text-muted-foreground">
          The <code>icon</code> prop takes one leading icon. The badge owns the
          12px icon size, the gap to the label, and the <code>aria-hidden</code>{' '}
          that keeps the icon out of the reading order. Pass the icon bare.
          There is no trailing icon slot.
        </p>
        <ModePreview>
          <Badge icon={<Sparkles />}>New</Badge>
          <Badge variant="success" icon={<CircleCheck />}>
            Paid
          </Badge>
          <Badge variant="warning" icon={<TriangleAlert />}>
            Expiring
          </Badge>
          <Badge variant="error" icon={<CircleAlert />}>
            Failed
          </Badge>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          None, by decision rather than omission. A badge has one state and
          never changes it in place. An app that mounts a badge as the result of
          a change animates the mount itself.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The badge renders a plain <code>span</code>. It takes no focus and no
          tab stop, and it carries no ARIA role, so a screen reader reads its
          text inline with the surrounding content. A leading icon is decoration
          and is hidden, so the label is read once. Every variant meets WCAG AA
          contrast in both modes. When the badge is the only carrier of a
          meaning, give the surrounding text that meaning as well: color alone
          never states a status.
        </p>
      </section>
    </article>
  )
}
