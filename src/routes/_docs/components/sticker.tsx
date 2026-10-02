import { createFileRoute } from '@tanstack/react-router'

import { houseStickerArt } from '@/components/house-sticker-art'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { Preview } from '@/components/preview'
import { Sticker } from '@/registry/ui/sticker'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export const Route = createFileRoute('/_docs/components/sticker')({
  component: StickerPage,
})

const drawingScriptExample = `import { ink, writeSticker } from '../src/components/ui/sticker/sticker-sketch.ts'
import type { Pen } from '../src/components/ui/sticker/sticker-sketch.ts'

const door = 'M 20 80 V 30 Q 20 16 40 16 Q 60 16 60 30 V 80 Z'

function drawFrame(
  { generator, draw, drawSilhouette }: Pen,
  frameSeed: number,
) {
  drawSilhouette([door], frameSeed + 10)
  draw(generator.path(door, { ...ink, fill: 'door', seed: frameSeed + 21 }))
}

writeSticker({
  exportName: 'doorStickerArt',
  width: 80,
  height: 96,
  drawFrame,
  output: new URL('../src/components/door-sticker-art.ts', import.meta.url),
})`

const generatedArtExample = `export const doorStickerArt = {
  width: 80,
  height: 96,
  frames: [
    [
      { role: 'cut', paint: 'fill', d: 'M20.4 79.6 C19.8 ...' },
      { role: 'door', paint: 'fill', d: 'M21.1 78.2 C20.6 ...' },
      { role: 'ink', paint: 'stroke', d: 'M19.7 80.3 C20.2 ...' },
    ],
    [ ... ],
    [ ... ],
  ],
} as const`

function StickerPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Sticker
        </h1>
        <p className="text-muted-foreground text-lg">
          Hand-drawn art cut out like a sticker. The drawing&apos;s lines boil
          the way a cartoon&apos;s do, and the sticker pops in as it scrolls
          into view. It marks a moment, such as the end of a trip or a page with
          nothing on it yet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The sticker</h2>
        <p className="text-muted-foreground">
          <code>Sticker</code> takes three things: <code>art</code>, the frames
          a drawing script generated; <code>roleClassNames</code>, which colours
          each part of the drawing; and <code>label</code>, which names the
          picture. Hand-drawn art is decoration with a job: it sits beside a
          title that says the same thing in words, and it never replaces the
          words.
        </p>
        <Preview>
          <Sticker
            art={houseStickerArt}
            label={houseStickerLabel}
            roleClassNames={houseStickerRoleClassNames}
            popIn={false}
            className="max-w-sm"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Art</h2>
        <p className="text-muted-foreground">
          The art is generated data, never written by hand. It has a{' '}
          <code>width</code> and a <code>height</code> in drawing units and
          three <code>frames</code>. A frame is a list of layers, and a layer is
          one SVG path: its <code>d</code>, its <code>paint</code> (
          <code>fill</code> or <code>stroke</code>), and its <code>role</code>.
          A role names a part of the drawing, <code>roof</code> or{' '}
          <code>door</code>, never a colour, so the same art follows whatever
          theme draws it.
        </p>
        <p className="text-muted-foreground">
          One role is the sticker&apos;s own: <code>cut</code> is the
          drawing&apos;s silhouette, which the sticker turns into its die-cut
          edge. Every other role is the art&apos;s to name.
        </p>
        <p className="text-muted-foreground">
          The boil is built for three frames, so art always has exactly three.
          The drawing script draws three, each with its own seeds.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The role map</h2>
        <p className="text-muted-foreground">
          <code>roleClassNames</code> gives each role a Tailwind class per
          paint. The classes are spelled out in full so Tailwind finds them, and
          they are split by paint because a fill class on a stroke path would
          override its <code>fill=&quot;none&quot;</code>. Colours come from the
          theme&apos;s functional aliases: <code>--foreground</code> for the
          ink, <code>--card</code> for paper, and the group colours for
          everything that tells one part from another (ADR 0004). A role the map
          leaves out draws in <code>--foreground</code>.
        </p>
        <p className="text-muted-foreground">
          A line&apos;s weight and dash belong to the map too. Every line draws
          at the same weight unless its role&apos;s classes set another, as the
          dotted <code>trail</code> behind the plane does.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Fill</TableHeadCell>
              <TableHeadCell>Stroke</TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(houseStickerRoleClassNames).map(
              ([role, classNames]) => (
                <TableRow key={role}>
                  <TableCell>
                    <code>{role}</code>
                  </TableCell>
                  <TableCell>
                    <code>{classNames.fill}</code>
                  </TableCell>
                  <TableCell>
                    <code>{classNames.stroke}</code>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The die-cut edge</h2>
        <p className="text-muted-foreground">
          The sticker strokes the <code>cut</code> silhouette thick three times:
          a <code>--border</code> layer offset down and to the right, a{' '}
          <code>--border</code> line, and a <code>--card</code> edge on top. The
          strokes merge into one cut around the whole drawing, so the art reads
          as a sticker on the page. Every pass is a solid palette colour: no
          shadow and no alpha (ADR 0003, ADR 0004).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Line boil</h2>
        <p className="text-muted-foreground">
          The three frames draw the same picture with a different wobble, and
          they take turns every 150ms on a 450ms loop (
          <code>animate-sticker-boil</code>), so the lines jitter like a
          cartoon&apos;s. The boil is continuous and runs for as long as the
          sticker is on the page. It is one of the motion language&apos;s
          documented exceptions to the 200ms limit (ADR 0001).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Pop-in</h2>
        <p className="text-muted-foreground">
          The sticker pops in as it scrolls into view: it grows from small and
          tilted, overshoots, and settles (<code>animate-sticker-pop</code>).
          The pop runs on the page&apos;s scroll position rather than a clock,
          from the moment the sticker is 10% into the viewport until it covers
          35% of it, so it plays at the speed the reader scrolls and plays
          backwards when they scroll back. A browser without scroll-driven
          animations shows the sticker at rest.
        </p>
        <p className="text-muted-foreground">
          Pop-in is on by default. Pass <code>popIn={'{false}'}</code> for a
          sticker that is already in view when its page opens, such as one at
          the top of an empty state; the stickers at the top of this page do.
          Scroll the one below in and out of view.
        </p>
        <Preview>
          <Sticker
            art={houseStickerArt}
            label={houseStickerLabel}
            roleClassNames={houseStickerRoleClassNames}
            className="max-w-xs"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Size and tilt</h2>
        <p className="text-muted-foreground">
          The sticker fills the width its parent gives it and keeps the
          art&apos;s aspect ratio. It applies no size and no tilt of its own:
          set both from outside with <code>className</code>, which reaches the
          root <code>svg</code> along with every other prop. A small tilt, two
          or three degrees either way, keeps a sticker from looking printed.
        </p>
        <Preview>
          <Sticker
            art={houseStickerArt}
            label={houseStickerLabel}
            roleClassNames={houseStickerRoleClassNames}
            popIn={false}
            className="max-w-52 -rotate-2"
          />
          <Sticker
            art={houseStickerArt}
            label={houseStickerLabel}
            roleClassNames={houseStickerRoleClassNames}
            popIn={false}
            className="max-w-60 rotate-3"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Drawing new art</h2>
        <p className="text-muted-foreground">
          Art comes from a drawing script built on rough.js. Installing the
          sticker adds <code>sticker-sketch.ts</code> to the sticker&apos;s
          folder, beside the component, and the <code>roughjs</code> dev
          dependency. The sketch module holds the pen: the ink&apos;s weight,
          roughness, and bowing, the silhouette pen, the three frames, and the
          output shape. A sticker&apos;s own script imports the pen, draws its
          shapes once per frame, and writes the art module beside the code that
          renders it.
        </p>
        <p className="text-muted-foreground">
          <code>drawSilhouette</code> takes the outline pieces the edge should
          cut around; a closed piece is filled so the edge has no holes.{' '}
          <code>draw</code> takes any rough.js drawable. A fill or stroke name
          becomes the layer&apos;s role, and <code>ink</code> strokes in the{' '}
          <code>ink</code> role. Offset every seed from <code>frameSeed</code>,
          so each frame wobbles differently and a rerun draws exactly the same
          frames.
        </p>
        <pre className="bg-card border-border overflow-x-auto rounded-lg border p-4 text-sm">
          <code>{drawingScriptExample}</code>
        </pre>
        <p className="text-muted-foreground">
          Run it with Node, which runs TypeScript directly, and commit the
          module it writes. Rerun it after every change to the drawing.
        </p>
        <pre className="bg-card border-border overflow-x-auto rounded-lg border p-4 text-sm">
          <code>node scripts/draw-door-sticker.ts</code>
        </pre>
        <pre className="bg-card border-border overflow-x-auto rounded-lg border p-4 text-sm">
          <code>{generatedArtExample}</code>
        </pre>
        <p className="text-muted-foreground">
          In this repo, <code>pnpm stickers:draw</code> regenerates the house on
          this page from <code>scripts/draw-house-sticker.ts</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The sticker is one image: an <code>svg</code> with{' '}
          <code>role=&quot;img&quot;</code> named by <code>label</code>, and its
          paths are presentational. Keep the label short and describe the
          picture, not its purpose: &ldquo;{houseStickerLabel}&rdquo;. It takes
          no focus and has no states. Its colours carry no meaning of their own,
          so they have no contrast floor; the title beside the sticker carries
          the meaning.
        </p>
      </section>
    </article>
  )
}
