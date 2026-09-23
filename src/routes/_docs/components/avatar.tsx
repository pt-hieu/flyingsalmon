import { createFileRoute } from '@tanstack/react-router'

import { Preview } from '@/components/preview'
import { Avatar, AvatarColor, AvatarSize } from '@/registry/ui/avatar'

export const Route = createFileRoute('/_docs/components/avatar')({
  component: AvatarPage,
})

const avatarColors: AvatarColor[] = [
  AvatarColor.Sky,
  AvatarColor.Pink,
  AvatarColor.Teal,
  AvatarColor.Fuchsia,
  AvatarColor.Cyan,
  AvatarColor.Blue,
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
        <Preview>
          <Avatar src="/avatar-sample-sky-300.svg" name="Ada Lovelace" />
          <Avatar
            src="/avatar-sample-sky-300.svg"
            name="Ada Lovelace"
            size={AvatarSize.Small}
          />
          <Avatar name="Ada Lovelace" />
          <Avatar name="Ada Lovelace" size={AvatarSize.Small} />
        </Preview>
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
        <Preview>
          <Avatar src="/avatar-sample-sky-300.svg" name="Ada Lovelace" />
          <Avatar
            src="/broken-path.png"
            name="Ada Lovelace"
            color={AvatarColor.Blue}
          />
          <Avatar
            name="Grace Brewster Murray Hopper"
            color={AvatarColor.Teal}
          />
          <Avatar name="Prince" color={AvatarColor.Fuchsia} />
          <Avatar color={AvatarColor.Pink} />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Color</h2>
        <p className="text-muted-foreground">
          The six group colors at their solid step:{' '}
          <code>sky pink teal fuchsia cyan blue</code>. With no{' '}
          <code>color</code>, the circle is neutral. Status hues and the indigo
          accent are left out, so an avatar never reads as a state or an action.
          The color drives the fallback circle only; an avatar showing an image
          never uses it. Pick the hue from a stable key such as a user id, so
          the same person keeps the same color.
        </p>
        <Preview>
          {avatarColors.map((avatarColor) => (
            <Avatar key={avatarColor} name="Ada Lovelace" color={avatarColor} />
          ))}
          <Avatar name="Ada Lovelace" />
        </Preview>
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
          Initials on a group color are neutral-950. The worst pair is pink at
          6.6:1, so all six hues pass WCAG AA. The neutral circle takes the page
          foreground: 14.5:1 on neutral-200. White initials fail on every step
          400 and are banned here.
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
        <Preview>
          <span className="flex items-center gap-2">
            <Avatar name="Ada Lovelace" alt="" color={AvatarColor.Cyan} />
            <span className="text-sm font-medium">Ada Lovelace</span>
          </span>
        </Preview>
      </section>
    </article>
  )
}
