import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import { Avatar, AvatarColor, AvatarSize } from '@/registry/ui/avatar'

export const Route = createFileRoute('/components/avatar')({
  component: AvatarPage,
})

const avatarColors: AvatarColor[] = [
  AvatarColor.Orange,
  AvatarColor.Amber,
  AvatarColor.Green,
  AvatarColor.Teal,
  AvatarColor.Sky,
  AvatarColor.Indigo,
  AvatarColor.Purple,
  AvatarColor.Pink,
]

function AvatarPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Avatar
        </h1>
        <p className="text-muted-foreground text-lg">
          The identity mark for a person: a user menu, a collaborator list, a
          comment row. Circle only, static, and never focusable.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Not interactive</h2>
        <p className="text-muted-foreground">
          The avatar takes no focus and no tab stop.{' '}
          <strong className="text-foreground">
            Wrap it in a button or a link when a click is needed
          </strong>{' '}
          — the wrapper owns the focus ring and the keyboard path. There is no
          status dot and no avatar stack yet.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two sizes: <code>default</code> at 32px with 12px initials, and{' '}
          <code>sm</code> at 24px with 10px initials. Use <code>sm</code> in
          dense rows such as comment lists.
        </p>
        <ModePreview>
          <Avatar src="/avatar-sample-sky-300.svg" name="Ada Lovelace" />
          <Avatar
            src="/avatar-sample-sky-300.svg"
            name="Ada Lovelace"
            size={AvatarSize.Small}
          />
          <Avatar name="Ada Lovelace" />
          <Avatar name="Ada Lovelace" size={AvatarSize.Small} />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Fallback chain</h2>
        <p className="text-muted-foreground">
          Three steps, in order. The image wins when it loads. Otherwise two
          uppercase initials from the first and last word of the name, one
          letter for a one-word name. With no name, a plain circle. While the
          image loads, the avatar draws nothing and holds its layout box, so the
          row never shifts.
        </p>
        <ModePreview>
          <Avatar src="/avatar-sample-sky-300.svg" name="Ada Lovelace" />
          <Avatar
            src="/broken-path.png"
            name="Ada Lovelace"
            color={AvatarColor.Purple}
          />
          <Avatar
            name="Grace Brewster Murray Hopper"
            color={AvatarColor.Teal}
          />
          <Avatar name="Prince" color={AvatarColor.Amber} />
          <Avatar color={AvatarColor.Pink} />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Color</h2>
        <p className="text-muted-foreground">
          Eight hues at step 400, closed as a union:{' '}
          <code>orange amber green teal sky indigo purple pink</code>. The
          default is <code>indigo</code>. Red is excluded because it carries the
          destructive meaning. The color drives the fallback circle only; an
          avatar showing an image never uses it. Pick the hue from a stable key
          such as a user id, so the same person keeps the same color.
        </p>
        <ModePreview>
          {avatarColors.map((avatarColor) => (
            <Avatar key={avatarColor} name="Ada Lovelace" color={avatarColor} />
          ))}
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          None. The image swaps in at once with no fade, and the fallback has no
          enter animation. An identity mark that fades in reads as a change of
          person.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          Initials are always neutral-950. The worst pair is indigo-400 at
          6.3:1, so all eight hues pass WCAG AA. The values are the same in
          light and dark mode. White initials fail on every step 400 and are
          banned here.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          <code>alt</code> defaults to <code>name</code>. The image uses it as
          its alt text; the initials fallback carries{' '}
          <code>role=&quot;img&quot;</code> with the same label, so a screen
          reader reads the person either way. Pass <code>alt=&quot;&quot;</code>{' '}
          when the name sits next to the avatar as text — the avatar then leaves
          the accessibility tree and the name is read once.
        </p>
        <ModePreview>
          <span className="flex items-center gap-2">
            <Avatar name="Ada Lovelace" alt="" color={AvatarColor.Green} />
            <span className="text-sm font-medium">Ada Lovelace</span>
          </span>
        </ModePreview>
      </section>
    </article>
  )
}
